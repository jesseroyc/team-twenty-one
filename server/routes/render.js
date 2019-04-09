import fs from 'graceful-fs';
import path from 'path';
import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import App from '../../src/App.js';
import Routes from '../../src/routes/index.js';

function render (req,res) {
    
  const currentRoute = Routes.find( route => matchPath(req.url, route) ) || {};
  const promise = (currentRoute.loadData) ? currentRoute.loadData() : Promise.resolve(null);

  promise.then(data => {
    console.log("test");
    const context = { data };
    const indexFile = path.resolve(__dirname,'index.html');

    fs.readFile(indexFile, 'utf8', (err, indexFileData) => {
      
      if (err) {
        console.error(err);
      }
      
      let renderRequestResponse = ReactDOMServer.renderToString(
          
        <div id="root">
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </div>
        
      );
      
      return res.send(indexFileData
        .replace(`<div id="root"></div>`,renderRequestResponse)
        .replace('</body>',`<script>window.__ROUTE_DATA__=${serialize(data)}</script></body>`)
      );
      
    });
  });
}

export default render;