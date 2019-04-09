import express from 'express';
import MongoService from '../service/mongoService';

const record = express.Router();

/**
 * Register MongoDB API
 * 
 * Receives and stores data from Arduino MK2
 * Retrieves data from mongo database
 */
 
record.get('/:tmp/:moi/:hum/:pre',function(req,res,next){
  let mongoService = new MongoService("mongodb","27017","admin","4dmInP4ssw0rd");
  mongoService.setRecord(req.params.tmp,req.params.moi,req.params.hum,req.params.pre);
  mongoService.insertReading("mydatabase","records")
  .then(function(dataSet){
    res.send(dataSet);
  }).catch(function(dataSet){
    res.send(dataSet);
  });
});
record.get('/',function(req,res,next){
  
  let mongoService = new MongoService("mongodb","27017","admin","4dmInP4ssw0rd");
  mongoService.getReadings("mydatabase","records")
  .then(function(dataSet){
    res.send(dataSet);
  }).catch(function(dataSet){
    res.send(dataSet);
  });
});

export default record;