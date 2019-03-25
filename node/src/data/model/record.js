import mongoose, { Schema } from 'mongoose';
import logger from "../service/winston-logger";

export const RecordSchema = new Schema  (
    {
        
        typ : {
                type: String,
                lowercase: true,
                trim: true,
                index: true,
                required: true,
        },
        
        id : {
                type: Number,
                index: true,
                required: true
        },
        
        tim : {
                type: Number,
                required: true
        },
        
        val : {
                type: Number,
                required: true
        }
        
    },
    { collection: 'records' }
);

RecordSchema.pre('view', function(next) {
        
	if (!this.typ || !this.val) {
	        logger.info('Missing typ OR val!');
	        next();
	}
	
	if(this.type ===('tmp' || "moi" || "lum")) {
	        logger.info('Key typ is not tmp, moi, or val!');
	        next();
	}
	
	next();
                
});
RecordSchema.pre('post', function(next) {
    
	if (!this.typ || !this.val) {
	        logger.info('Missing typ OR val!');
	        next();
	}
	
	if(this.type ===('tmp' || "moi" || "lum")) {
	        logger.info('Key typ is not tmp, moi, or val!');
	        next();
	}
                
});

RecordSchema.index({
                    typ:'tmp',_id:1,
                    typ:'moi',_id:1,
                    typ:'lum',_id:1
});

export default mongoose.model('Record',RecordSchema);