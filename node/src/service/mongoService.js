import mongodb from 'mongodb';
import logger  from "./winston-logger";

const MongoClient = mongodb.MongoClient;

export default class MongoService {
  
  constructor(MONGO_HOST,MONGO_PORT,MONGO_USER,MONGO_PASS){
    this.HOST = MONGO_HOST;
    this.PORT = MONGO_PORT;
    this.USER = MONGO_USER;
    this.PASS = MONGO_PASS;
    this.recordId = MongoService.incrementId();
    this.record = {};
  }
  
  static incrementId() {
    return !this.latestId 
    ? this.latestId = 1
    : this.latestId++;
  }
  
  setRecord(tmperature,moisture,brightness){
    this.record = {
      _id: this.recordId, 
      tim: Math.floor(Date.now() / 1000),
      tmp: tmperature,
      moi: moisture,
      lum: brightness
    };
  }
  
  /* STORE READING FROM URL PARAMS */
  insertReading(DB_NAME,COL_NAME){
    
    let HOST = this.HOST;
    let PORT = this.PORT;
    let USER = this.USER;
    let PASS = this.PASS;
    let record = this.record;
    
    const url = `mongodb://${USER}:${PASS}@${HOST}:${PORT}`;
    logger.info(url);
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      if(err) {
        logger.info(`Failed server connection to ${HOST} on port ${PORT}`);
        console.error(err);
        client.close();
      } 
      else {
        logger.info(`Successful server connection to ${HOST} on port ${PORT}`);
      }
      client.db(DB_NAME).collection(COL_NAME).insertOne( record, function(err, res) {
        if (err) {
          logger.info(`Failed 'insert' client request for ${COL_NAME} in ${DB_NAME}`);
          console.error(err);
          client.close();
        } 
        else {
          logger.info(`Successful 'insert' client request for ${COL_NAME} in ${DB_NAME}`);
          logger.info("Inserted Record:" +
                      "\n  {" +
                      "\n    _id: " + res.ops[0]["_id"] +
                      "\n    tim: " + res.ops[0]["tim"] +
                      "\n    tmp: " + res.ops[0]["tmp"] +
                      "\n    moi: " + res.ops[0]["moi"] +
                      "\n    lum: " + res.ops[0]["lum"] +
                      "\n  }"
          );
        }
      });
    });
  }
  
  /* GET READINGS, PLACE INTO ARRAY */
  getReadings(DB_NAME,COL_NAME){
    
    let HOST = this.HOST;
    let PORT = this.PORT;
    let USER = this.USER;
    let PASS = this.PASS;
    
    const url = `mongodb://${USER}:${PASS}@${HOST}:${PORT}`;
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      if(err) {
        logger.info(`Failed server connection to ${HOST} on port ${PORT}`);
        console.error(err);
        client.close();
      } 
      else {
        logger.info(`Successful server connection to ${HOST} on port ${PORT}`);
      }
      client.db(DB_NAME).collection(COL_NAME).find({}).toArray(function(err, result) {
        if (err) {
          logger.info(`Failed 'find' client request for ${COL_NAME} in ${DB_NAME}`);
          console.error(err);
          client.close();
        } 
        else {
          let tmpArr = result.map(ele => parseFloat(ele.tmp)).filter(num => !Number.isNaN(num));
          let moiArr = result.map(ele => parseFloat(ele.moi)).filter(num => !Number.isNaN(num));
          let lumArr = result.map(ele => parseFloat(ele.lum)).filter(num => !Number.isNaN(num));
          logger.info(`Successful 'find' client request for ${COL_NAME} in ${DB_NAME}` +
          `\nTemperature Readings:\n [${tmpArr}]` +
          `\nMoisture Readings:\n [${moiArr}]` +
          `\nBrightness Readings:\n [${lumArr}]`
          );
        }
      });
    });
  }
}