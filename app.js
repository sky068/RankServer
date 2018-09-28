let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let router = require('./routes/index');
let fs = require('fs');
let fileStreamRotator = require('file-stream-rotator');
let md5 = require('./encrypt/Md5').md5_hex_hmac;

// 记录日志到文件
let logDirectory = __dirname + "/logs";
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = fileStreamRotator.getStream({
  filename: logDirectory + "/access-%DATE%.log",
  frequency: "daily",
  verbose: false
});

let errLogStream = fileStreamRotator.getStream({
  filename: logDirectory + "/error-%DATE%.log",
  frequency: "daily",
  verbose: false
});

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 记录日志
app.use(logger('combined', { stream: accessLogStream }));
// app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.use(function (req, res, next) {
  if (req.method === "OPTIONS") {
    let headers = {};
    headers["Access-Control-Allow-Origin"] = "*";

    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";

    headers["Access-Control-Allow-Credentials"] = false;

    headers["Access-Control-Max-Age"] = '86400'; // 24 hours

    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

    res.writeHead(200, headers);

    res.end();
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  }
});

// 加密校验 md5_hex_hmac 
let encryptKey = 'tclsafegame';
app.use(function(req, res, next){
    // 旧版本不校验
    if (!req.body.version){
       return next();
    }

    let encrypt = req.body.encrypt || "";
    let cur = md5(encryptKey, JSON.stringify(req.body.data));
    if (cur != encrypt){
      return next(new Error('数据验证失败，请确认是否修改了游戏数据 \n' + 'data=' + JSON.stringify(req.body) + "\n" + "encrypt=" + encrypt));
    } 
    req.body = req.body.data;
    next();
});

//========
let mongoUrl = "mongodb://skyxu:skyxu001@localhost/rank";
let mongoose = require('mongoose');
mongoose.connect(mongoUrl);

  /**
  * 连接成功
  */
 mongoose.connection.on('connected', function () {    
  console.log('Mongoose connection open to ' + mongoUrl);  
  let user = require('./mongodb/UserModel');

  // 设置/routes/index文件为总的路由控制文件
  // 在index文件中再进行统一的路由分发
  router(app, user);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

    // 写入日志
    let des = req.ip + " " + (new Date()).toString() + " " + req.method + " " + req.path + " " + req.protocol + "/" + req.httpVersion + " " + res.statusCode + " " + req.headers["user-agent"] + " ";
    // des += "\n";
    let errInfo = err.stack || err.message;
    des += errInfo;
    des += "\n";
    errLogStream.write(des);
    console.error(des);
  });
});    

/**
* 连接异常
*/
mongoose.connection.on('error',function (err) {    
  console.log('Mongoose connection error: ' + err);  
});    

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function () {    
  console.log('Mongoose connection disconnected');  
});
//========

module.exports = app;
