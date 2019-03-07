import React from 'react';
import fs from 'fs';
import path from 'path';
import app from './app';
import serialize from 'serialize-javascript';
import renderToString from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import Routes from '../src/routes';
import App from '../src/App';

app.get('/', (req, res) => {
  const currentRoute = Routes.find( route => matchPath(req.url, route) ) || {};
  let promise = (currentRoute.loadData) ? currentRoute.loadData() : Promise.resolve(null);

  promise.then(data => {
    const context = { data };
    const indexFile = path.resolve('./build/index.html');
    
    fs.readFile(indexFile, 'utf8', (err, indexData) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).end();
      }
      if (context.status === 404) { res.status(404); }
      if (context.url) { return res.redirect(301, context.url); }
      return res.send(indexData.replace('<div id="root"></div>', 
        renderToString(
          <div id="root">
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </div>
        )
        )
        .replace('</body>',
          `<script>window.__ROUTE_DATA__ =${serialize(data)}</script></body>`
      ));
    });
  });
});

export default app;