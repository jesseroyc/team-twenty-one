const express = require('express');
const router = express.Router();
const app = express();
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';

app.use(logger('dev'));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.use(function(req, res, next) {
  console.log(req.method, req.url, req.path);
  next();
});

app.use('/',router);

// Parameters
router.get('/records/:typ/:val/:tim', function (req, res) {
  let params = { typ: req.params.typ, val: req.params.val, tim: req.params.tim };
  res.send(...params);
});

// Query
router.get('/records?typ=string&val=double&tim=integer*', function (req, res) {
  let query = { typ: req.query.typ, val: req.query.val, tim: req.query.tim };
  res.send(...query);
});

app.get("/record",function(req,res){
    const type = req.query.type;
    const value = req.query.value;
    res.send({type,value});
});

export default router;