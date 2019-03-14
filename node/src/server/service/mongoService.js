import logger from "./winston-logger";

import assert from "assert";
import {tStamp,rando} from './helpers';
import importEnvVars from "./envService";
import async from "async";

const ENVS = importEnvVars;
const {
  MONGO_ADMIN_USER, MONGO_ADMIN_PASS, MONGO_ADMIN_ROLE, MONGO_ADMIN_NAME, 
  MONGO_OWNER_USER, MONGO_OWNER_PASS, MONGO_OWNER_ROLE, MONGO_OWNER_NAME
} = ENVS; // TO DO - GET URLS OF DEPLOYMENT
  
// Connection client
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = `mongodb:${process.env.IP}:${process.env.PORT}`;

const connectTest = function () {
    MongoClient.connect(url, function(err, client) {
        if (err.message.code === 'ETIMEDOUT') {
            logger.info("TEST: Attempting reconnect after time out.");
            MongoClient.connect(url, {useNewUrlParser: true});
        } else if(err){
            logger.info("Failed to reconnect with {useNewUrlParser}");
            logger.info(err);
        }
        logger.info(`TEST: Database connected ${process.env.IP} on ${process.env.PORT}`);
        let db = new Mongo().getDB(MONGO_OWNER_NAME);
        seedDatabase(db, function() {
            client.close();
        });
    });
};
const seedDatabase = function(db, callback) {
  const collection = db.collection('documents');
  // Seeded 3 sets of temperature, moisture, light values
  collection.insertMany([
    {typ : 'tmp', id : 1, val: rando(0,40), tim : tStamp(1)}, 
    {typ : 'mos', id : 1, val: rando(0,40), tim : tStamp(1)}, 
    {typ : 'lum', id : 1, val: rando(0,40), tim : tStamp(1)},
    {typ : 'tmp', id : 2, val: rando(0,40), tim : tStamp(2)}, 
    {typ : 'mos', id : 2, val: rando(0,40), tim : tStamp(2)}, 
    {typ : 'lum', id : 2, val: rando(0,40), tim : tStamp(2)},
    {typ : 'tmp', id : 3, val: rando(0,40), tim : tStamp(3)}, 
    {typ : 'mos', id : 3, val: rando(0,40), tim : tStamp(3)}, 
    {typ : 'lum', id : 3, val: rando(0,40), tim : tStamp(3)}
  ], function(err, result) {
    if(err){ 
      logger.info(err);
      db.close();
    }
    assert.equal(err, null);
    // TO DO INCLUDE ASSERTS
    logger.info("TEST: Inserted 3 documents into the collection");
    callback(result);
  });
};

const getDB = function(err) {
  if(err){ logger.info(err); return null; }
  return new Mongo().getDB(MONGO_OWNER_NAME);
};

const drop = function(done) {
  
    MongoClient.connect(url, function(err, client) {
        if (err.message.code === 'ETIMEDOUT') {
            logger.info("Attempting reconnect after time out.");
            MongoClient.connect(url, {useNewUrlParser: true});
        } else if (err){
            logger.info("Failed to reconnect with {useNewUrlParser}");
            logger.info(err);
            client.close();
        }
        
        logger.info(`Database connected ${process.env.IP} on ${process.env.PORT}`);
        let db = new Mongo().getDB(MONGO_OWNER_NAME);
        
        db.collections( function(err, collections) {
          if(err){ 
            logger.info(err);
            client.close();
          }
          
          async.each(collections, function(collection, cb) {
            if (collection.collectionName.indexOf('system') === 0) {
              return cb();
            }
            collection.remove(cb);
            logger.info("Collection removed.");
          }, done);
        });
    });
};
const addOneSet = function(arraySetOfObj, callback) {
  
    MongoClient.connect(url, function(err, client) {
        if (err.message.code === 'ETIMEDOUT') {
            logger.info("Attempting reconnect after time out.");
            MongoClient.connect(url, {useNewUrlParser: true});
        } else if (err){
            logger.info("Failed to reconnect with {useNewUrlParser}");
            logger.info(err);
            client.close();
        }
        
        logger.info(`Database connected ${process.env.IP} on ${process.env.PORT}`);
        let db = new Mongo().getDB(MONGO_OWNER_NAME);
        
        db.collection.insertOne([
          arraySetOfObj[0],arraySetOfObj[1],arraySetOfObj[2]
        ], function(err, result) {
        if (err) {
            logger.info(err);
            client.close();
        }
        
          assert.equal(err, null);
          // TO DO INCLUDE ASSERTS
          logger.info("Added single set of 3 readings from sensors");
          callback(result);
      });
  });
};
const exportAll = function(callback) {
  
    MongoClient.connect(url, function(err, client) {
        if (err.message.code === 'ETIMEDOUT') {
            logger.info("Attempting reconnect after time out.");
            MongoClient.connect(url, {useNewUrlParser: true});
        } else if (err){
            logger.info("Failed to reconnect with {useNewUrlParser}");
            logger.info(err);
            client.close();
        }
        
        logger.info(`Database connected ${process.env.IP} on ${process.env.PORT}`);
        let db = new Mongo().getDB(MONGO_OWNER_NAME);
  
        db.bios.find({val:{$all:[], 
            function(err, result) {
              if(err){
                logger.info(err);
                client.close();
              }
              assert.equal(err, null);
              // TO DO INCLUDE ASSERTS
              logger.info("All values exported");
              callback(result);
            }}
        });
    });
};

export default { drop, getDB, connectTest, addOneSet, exportAll };