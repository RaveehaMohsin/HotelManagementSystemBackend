var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const database = require('./database/mongodb');
var addRoomRouter = require('./routes/roomadd');
var getRoomRouter = require('./routes/room(get,delete,update)');


var addEmployee = require("./routes/employeeadd");
var getEmployeesRouter = require('./routes/employee(get,delete,update)');


var addUserAuth = require("./routes/addUser")
var getUserAuth = require("./routes/getUserAuth")


var getAvailablerooms = require("./routes/getAvailableRooms")
var getBookedrooms = require("./routes/getBookedrooms")
var addBookingRouter = require("./routes/addBooking");
var getBookingrouter = require("./routes/getbooking");

var nodemailerrouter = require ("./routes/nodemail");

var reviewrouter = require("./routes/addreview");
var getreviewrouter = require("./routes/getreviews");

var checkoutrouter = require("./routes/checkout");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/employeeImages', express.static(path.join(__dirname, 'public/employeeImages')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/roomadd', addRoomRouter);
app.use('/room', getRoomRouter );

app.use('/employeeadd', addEmployee);
app.use('/employee', getEmployeesRouter);

app.use('/adduser', addUserAuth);
app.use('/getusers',getUserAuth );

app.use('/getAvailablerooms', getAvailablerooms );
app.use('/getBookedrooms', getBookedrooms);
app.use('/addbooking', addBookingRouter);
app.use('/bookings', getBookingrouter);

app.use('/contactus', nodemailerrouter);

app.use('/reviewadd', reviewrouter);
app.use('/reviews', getreviewrouter);

app.use('/checkout' , checkoutrouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
