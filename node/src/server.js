import path         from 'path';
import express      from 'express';
import cookieParser from 'cookie-parser';
import compression  from 'compression';
import logger       from "./service/winston-logger";
import morgan       from "morgan";

import MongoService from "./service/mongoService";
import index from "./view/index.js";

const SERVER_PORT = 8080;

const app = express();

// Server Middleware
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static asset serving
app.use(express.static(path.join(__dirname, 'public')));

// Receives and stores data from Arduino MK2
app.get('/record/:tmp/:moi/:lum',function(req,res,next){
  let mongoService = new MongoService("0.0.0.0","27017","admin","4dmInP4ssw0rd");
  mongoService.setRecord(req.params.tmp,req.params.moi,req.params.lum);
  mongoService.insertReading("mydatabase","records");
  next();
});

// Retrieves data from mongo database
app.get('/record',function(req,res,next){
  let mongoService = new MongoService("0.0.0.0","27017","admin","4dmInP4ssw0rd");
  mongoService.getReadings("mydatabase","records");
  next();
});

// Server side page rendering
app.get('*', function(req, res) {
  index(req,res);
});

// Server listener
app.listen(SERVER_PORT, function(err,req,res) {
  // Error logger configurations
	if (err) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500);
    res.render('error');
	}
	logger.info(`APP is now running on port ${SERVER_PORT}`);
});