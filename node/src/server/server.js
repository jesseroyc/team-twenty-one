import importEnvVars from "./service/envService";
const ENVS = importEnvVars;

import logger from "./service/winston-logger";
import morgan from "morgan";

import fs from 'fs';
import path from 'path';
import express from 'express';
import serialize from 'serialize-javascript';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import React from 'react';
import ReactDOMServer from "react-dom/server";
import { StaticRouter, matchPath } from 'react-router-dom';
import App from '../client/App.js';
import Routes from '../client/routes/index.js';
import Record from "./controller/record"

const HOST = process.env.IP;
const PORT = process.env.PORT;

const app = express();

app.use(morgan('dev'));

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static asset serving

// Server Side Rendering
app.get('*', (req, res, next) => {
  const currentRoute = Routes.find( route => matchPath(req.url, route) ) || {};
  let promise = (currentRoute.loadData) ? currentRoute.loadData() : Promise.resolve(null);

  promise.then(data => {
    const context = { data };
    const indexFile = path.resolve(__dirname,'../index.html');
    
    fs.readFile(indexFile, 'utf8', (err, indexData) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).end();
      }
      if (context.status === 404) { res.status(404); }
      if (context.url) { return res.redirect(301, context.url); }
      return res.send(indexData.replace(
        '<div id="root"></div>', 
          ReactDOMServer.renderToString(
            <div id="root">
              <StaticRouter location={req.url} context={context}>
                <App />
              </StaticRouter>
            </div>
            )
          ).replace('</body>',
        `<script>window.__ROUTE_DATA__=${serialize(data)}</script></body>`
        )
      );
    });
  });
});
// 404 Catcher
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handle
app.use(function(err, req, res, next) {
  // Server defined error exclusive
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // Render error response
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, err => {
  
	if (err) {
		logger.error(err);
		process.exit(1);
	}
	
  app.route('/record/view').get(Record.view);
  app.route('/record/:values').post(Record.post);
	
	logger.info(
		`APP is now running on port ${PORT} at ${HOST}`
	);
});