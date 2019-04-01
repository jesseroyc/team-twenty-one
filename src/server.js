const dotenv = require('dotenv').config();
import path         from 'path';
import express      from 'express';
import cookieParser from 'cookie-parser';
import compression  from 'compression';
import logger       from "./service/winston-logger";
import morgan       from "morgan";

import MongoService from "./service/mongoService";
import render from "./view/render.js";

const app = express();

/**
 * Register Node.js Middleware
 */
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Register MongoDB API
 * 
 * Receives and stores data from Arduino MK2
 * Retrieves data from mongo database
 */
app.get('/record/:tmp/:moi/:lum',function(req,res,next){
  let mongoService = new MongoService("mongodb","27017","admin","4dmInP4ssw0rd");
  mongoService.setRecord(req.params.tmp,req.params.moi,req.params.lum);
  mongoService.insertReading("mydatabase","records");
});
app.get('/record',function(req,res,next){
  let mongoService = new MongoService("mongodb","27017","admin","4dmInP4ssw0rd");
  mongoService.getReadings("mydatabase","records");
});

/**
 * Register Server Side Rendering
 */
app.get('*', function(req, res) {
  render(req,res);
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