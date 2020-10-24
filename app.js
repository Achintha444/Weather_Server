var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



//* Route Files
var weatherRouter = require('./routes/weatherRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//* Routes
app.use('/', weatherRouter);

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
});

// var xml = '<?xml version = "1.0" encoding = "UTF-8"?> <alert xmlns = "urn:oasis:names:tc:emergency:cap:1.2"> <identifier>TRI13970876.2</identifier> <sender>trinet@caltech.edu</sender> <sent>2003-06-11T20:56:00-07:00</sent> <status>Actual</status> <msgType>Update</msgType> <scope>Private</scope> <references>200</references> <info> <category>Env</category> <event>Weather</event>   <urgency>Expected</urgency>   <severity>Minor</severity>   <certainty>Observed</certainty>  <parameter> <valueName>EventID</valueName> <value>13970876</value> </parameter> <parameter> <valueName>Version</valueName> <value>1</value></parameter> <parameter><valueName>Magnitude</valueName>  <value>3.4 Ml</value>  </parameter> <parameter> <valueName>Depth</valueName><value>11.8 mi.</value> </parameter><parameter><valueName>Quality</valueName><value>Excellent</value></parameter><area>       <areaDesc>1 mi. WSW of Brawley, CA; 11 mi. N of El Centro, CA; 30 mi. E of OCOTILLO (quarry); 1 mi. N of the Imperial Fault</areaDesc>  </area> </info></alert>'

// console.log('-------------');

// const parseString = require('xml2js').parseString;

// parseString(xml, function (error, result) {
//   var temp = result.alert.info[0];
//   console.log(createAck(result));
//   console.log(result);
// });

// console.log(getTimeStamp());

module.exports = app;
