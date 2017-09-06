var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodbUri = require('mongodb-uri');
var cfenv = require('cfenv');
var passport = require('passport');
var authenticate = require('./authenticate');

var config = require('./config');

var index = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var messages = require('./routes/messages');
var hashtags = require('./routes/hashtags');
var crushs = require('./routes/crushs');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
    extended: true
}));
app.use(require('express-session')({
    secret: config.secretKey,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var appenv = cfenv.getAppEnv();
var services = appenv.services;
var mongodb_services = services["compose-for-mongodb"];
var credentials = mongodb_services[0].credentials;
var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];
console.log(ca);

var uri = credentials.uri;
var mongooseConnectString = mongodbUri.formatMongoose(uri);
console.log(mongooseConnectString);
var singlemongooseConnectString = mongooseConnectString.split(",")[0];
console.log(singlemongooseConnectString);
mongoose.connect(singlemongooseConnectString, {
    server: {
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        poolSize: 1,
        reconnectTries: 1
    }
});

//mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});
app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
app.use('/messages', messages);
app.use('/hashtags', hashtags);
app.use('/crushs', crushs);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
var listener = app.listen(3000, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.disable('view cache');


module.exports = app;
