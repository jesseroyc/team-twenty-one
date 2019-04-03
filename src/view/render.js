// TO DO: Split markup and rendering
import fs        from 'graceful-fs';
import path      from 'path';
import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer              from "react-dom/server";
import { StaticRouter, matchPath } from 'react-router-dom';
import App                         from './App.js';
import Routes                      from './routes/index.js';

function render (req,res,message) {
    
  const currentRoute = Routes.find( route => matchPath(req.url, route) ) || {};
  const promise = (currentRoute.loadData) ? currentRoute.loadData() : Promise.resolve(null);
  
  promise.then(data => {
      
    const context = { data };
    const indexFile = path.resolve(__dirname,'./public/index.html');
    
    fs.readFile(indexFile, 'utf8', (err, indexFileData) => {
      
      if (err) {
        console.error(err);
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
      
      console.log(message);
      return res.send(indexFileData
        .replace(`<div id="data"></div>`,`
        <h2>Temperature Data</h2>
        <p>${message.tmp.toString()}22.51,22.51,22.53</p>
        <p> </p>
        <h2>Moisture Data</h2>
        <p>${message.moi.toString()}355,351,353</p>
        <p> </p>
        <h2>Pressure Data</h2>
        <p>${message.pre.toString()}89769.84,89772.52,89770.2</p>
        <p> </p>
        <h2>Humidity Data</h2>
        <p>${message.hum.toString()}55.81,55.85,55.64</p>
        <p> </p>
        <canvas id="myChart" width="400" height="400"></canvas>
        <script>
          var ctx = $('#myChart');
          var myChart = new Chart(ctx, {
              type: 'line',
              data: ${message.tmp},
              options: options
          });
        </script>`)
        .replace(`<div id="root"></div>`,renderRequestResponse)
        .replace('</body>',`<script>window.__ROUTE_DATA__=${serialize(data)}</script></body>`)
      );
      
    });
  });
}

export default render;