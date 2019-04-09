const dotenv = require('dotenv').config();
import path         from 'path';
import express      from 'express';
import cookieParser from 'cookie-parser';
import compression  from 'compression';
import logger       from "./service/winston-logger";
import morgan       from "morgan";
import routes       from './routes/index.js';
import mongoService from './service/mongoService.js';

const app = express();

/**
 * Register Node.js Middleware
 */
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
app.use('/static', express.static(path.resolve(__dirname, 'static')));

app.get('/record/:tmp/:moi/:hum/:pre',function(req,res,next){
  mongoService.setRecord(req.params.tmp,req.params.moi,req.params.hum,req.params.pre);
  mongoService.insertReading("mydatabase","records")
  .then(function(dataSet){
    res.send(dataSet);
  }).catch(function(dataSet){
    res.send(dataSet);
  });
});
app.get('/record',function(req,res,next){
  mongoService.getReadings("mydatabase","records")
  .then(function(dataSet){
    res.send(dataSet);
  }).catch(function(dataSet){
    res.send(dataSet);
  });
});

/**
 * Register Server Side Rendering
 */
app.get('*', function(req, res) {
  routes.render(req,res);
});

/**
 * Launch Server
 */
app.listen(process.env.SERVER_PORT, function(err,req,res) {
  // Error logger configurations
	if (err) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500);
    res.render('error');
	}

  logger.info('Listening on', process.env.SERVER_PORT);
});

export default app;