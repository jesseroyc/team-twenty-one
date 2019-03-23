// TO DO: Split markup and rendering
import fs        from 'graceful-fs';
import path      from 'path';
import serialize from 'serialize-javascript';

import React                       from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactDOMServer              from "react-dom/server";
import { StaticRouter, matchPath } from 'react-router-dom';
import App                         from './App.js';
import Routes                      from './routes/index.js';

function index (req,res) {
    
  const currentRoute = Routes.find( route => matchPath(req.url, route) ) || {};
  const promise = (currentRoute.loadData) ? currentRoute.loadData() : Promise.resolve(null);
  
  promise.then(data => {
      
    const context = { data };
    const indexFile = path.resolve(__dirname,'./public/index.html');
    
    fs.readFile(indexFile, 'utf8', (err, indexFileData) => {
      
      if (err) {
        console.error('Error:', err);
        return res.status(500).end();
      }
      
      // REVIEW: Using const
      // TO DO: Integrate react apps for responses
      if (context.status === 404) { 
        res.status(404);
        const renderRequestResponse = ReactDOMServer.renderToString(
          <div id="root">
            <p>404</p>
          </div>
        );
        return res.send(indexFileData
          .replace(`<div id="root"></div>`,renderRequestResponse)
        );
      }
      
      // REVIEW: Using const
      // TO DO: Remove return catch all and define routes for new responses
      const renderRequestResponse = ReactDOMServer.renderToString(
          
        <div id="root">
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </div>
        
      );
      
      console.log("\n"+renderRequestResponse+"\n");
      
      return res.send(indexFileData
        .replace(`<div id="root"></div>`,renderRequestResponse)
        .replace('</body>',`<script>window.__ROUTE_DATA__=${serialize(data)}</script></body>`)
      );
      
    });
  });
}

export default index;