import path         from 'path';
import express      from 'express';
import cookieParser from 'cookie-parser';
import compression  from 'compression';
import logger       from "./service/winston-logger";
import morgan       from "morgan";

import MongoService from "./service/mongoService";
import index from "./view/index.js";

/**
 * Global Vendor Tooling
 * TODO
 */

/**
 * Trust Proxy
 * TODO
 */
 
 // crude
const SERVER_PORT = 8080;

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
 * Register Cookie Authentication
 * TODO
 */


/**
 * Register MongoDB API
 * 
 * Receives and stores data from Arduino MK2
 * Retrieves data from mongo database
 * TO DO Refactor to new folder
 */
app.get('/record/:tmp/:moi/:lum',function(req,res,next){
  let mongoService = new MongoService("0.0.0.0","27017","admin","4dmInP4ssw0rd");
  mongoService.setRecord(req.params.tmp,req.params.moi,req.params.lum);
  mongoService.insertReading("mydatabase","records");
  next();
});
app.get('/record',function(req,res,next){
  let mongoService = new MongoService("0.0.0.0","27017","admin","4dmInP4ssw0rd");
  mongoService.getReadings("mydatabase","records");
  next();
});

/**
 * Register Server Side Rendering
 * TODO
 */
app.get('*', function(req, res) {
  index(req,res);
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    
    // Universal HTTP client
    
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
});

/**
 * Error Handling
 * Seperation from listener
 * TODO
 */
 
/**
 * Launch Server
 */
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

/**
 * Hot Module Replacement
 * TODO
 */
 
 export default app;