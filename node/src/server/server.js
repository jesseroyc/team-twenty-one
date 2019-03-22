import fs           from 'fs';
import path         from 'path';
import express      from 'express';
import serialize    from 'serialize-javascript';
import cookieParser from 'cookie-parser';
import compression  from 'compression';
import logger       from "./service/winston-logger";
import morgan       from "morgan";

import React                       from 'react';
import ReactDOMServer              from "react-dom/server";
import { StaticRouter, matchPath } from 'react-router-dom';
import App                         from '../client/App.js';
import Routes                      from '../client/routes/index.js';

import MongoService from "./service/mongoService";

const SERVER_PORT = 80;

const app = express();

// Server Middleware
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static asset serving
app.use(express.static(path.join(__dirname, 'public')));

// Arduino MK2 data get route
app.get('/record/:tmp/:moi/:lum',function(req,res,next){
  /* Refactored into class */
  let mongoService = new MongoService("0.0.0.0","27017","admin","4dmInP4ssw0rd");
  mongoService.setRecord(req.params.tmp,req.params.moi,req.params.lum);
  // mongoService.getReadings("mydatabase","records");
  mongoService.insertReading("mydatabase","records");
  next();
});

// Server Side Rendering
app.get('*', function(req, res) {
  const currentRoute = Routes.find( route => matchPath(req.url, route) ) || {};
  let promise = (currentRoute.loadData) ? currentRoute.loadData() : Promise.resolve(null);

  promise.then(data => {
    const context = { data };
    const indexFile = path.resolve(__dirname,'./index.html');
    
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

// Server listener and error logger
app.listen(SERVER_PORT, function(err,req,res) {
  
	if (err) {
    // Server reported errors
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // Reported by winston
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
    // Render error response
    res.status(err.status || 500);
    res.render('error');
	}
  
	logger.info(`APP is now running on port ${SERVER_PORT}`);
	
});

export default app;