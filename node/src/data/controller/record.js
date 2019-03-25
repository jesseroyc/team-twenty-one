import async from "async";
import validator from 'validator';
import Record from "../model/record";
import logger from "../service/winston-logger";

import tStamp from "../service/helpers"
import { addOneSet, exportAll } from "../service/mongoService";

let dataIndex;
if(dataIndex === 0) { dataIndex = 0;}

exports.view = function (req,res) {
    
    const param = req.param || {};
    const query = req.query || {};
    let data;
    
    logger.info(param,query,req.body);
    
    if((param['leftBound'] && !validator.isVal(data.val))) {
            return res.status(422).send('Invalid left bound requested.');
    }
    
    if((param['rightBound'] && !validator.isVal(data.val))) {
            return res.status(422).send('Invalid right bound requested.');
    }
    
    if(query != ( {type:"tmp"} || {type:"moi"} || {type:"lum"})) {
            return res.status(422).send('Not a temperature, moisture or brightness type.');
    }
    
    const sensorType = query;
    const boundaryParameters = ( 
        (param['leftBound'] - param['rightBound']) > (param['rightBound'] - param['leftBound'])
        ) ? [ param['rightBound'], param['leftBound'] ] : [ param['leftBound'], param['rightBound'] ];
    
    logger.info(`Query of type ${sensorType} from ${boundaryParameters[0]} to ${boundaryParameters[1]}`);
    Record.bios.find({ 
        typ: sensorType, 
        _id: { $gt: boundaryParameters[0], $lt: boundaryParameters[1] } 
    }).then( (records) => {
        logger.info(records);
        res.send(records);
    })
    .catch((err) => {
        logger.info("Database unable to query boundaries.");
        res.status(422).send(err.errors);
    });
};

exports.post = function(req,res,err) {

    logger.info(req.body);
    
    if ( req.accepts('html, json') === 'json' ) {
        
        const data = JSON.stringify(req.body);
        
        let inputSet = [
          { "typ":"tmp", _id:dataIndex, "val":JSON.stringify(data)["tmp"], "tim":tStamp },
          { "typ":"moi", _id:dataIndex, "val":JSON.stringify(data)["moi"], "tim":tStamp },
          { "typ":"lum", _id:dataIndex, "val":JSON.stringify(data)["lum"], "tim":tStamp }
        ];
        
        logger.info(data,inputSet);
        addOneSet(inputSet, (db,err) => {
            if(err) { 
                logger.info("Unsucessfully handles HTML Error:");
                logger.error(err);
            }
            
            res.send('Values Received.');
            logger.info("HTML set added.");
            dataIndex = dataIndex + 1;
        
        });
        
    } else if ( req.accepts('html, json') === 'json' ) {
        
        const data = Object.assign({}, req.body, { user: req.report.sub }) || {};
        
        let inputSet = [
          { "typ":"tmp", _id:dataIndex, "val":data["tmp"], "tim":tStamp },
          { "typ":"moi", _id:dataIndex, "val":data["moi"], "tim":tStamp },
          { "typ":"lum", _id:dataIndex, "val":data["lum"], "tim":tStamp }
        ];
        
        logger.info(data,inputSet);
        addOneSet(inputSet, (db,err) => {
            if(err) { 
                logger.info("Unsucessfully handles HTML Error:");
                logger.error(err);
            }
            
            res.send('Values Received.');
            logger.info("HTML set added.");
            dataIndex = dataIndex + 1;
        
        });
    }
};
