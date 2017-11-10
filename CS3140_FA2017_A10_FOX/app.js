var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');


var index = require('./routes/index');
//var users = require('./routes/users');

var app=express();


/*var logger = function(req, res, next){
	console.log('Logging...');
	next();
}


app.use(logger);
*/

//view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//set static path
app.use(express.static(path.join(__dirname, 'public')))

	
app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


app.listen(3000, function(){
	console.log('Server Started on Port 3000');
})