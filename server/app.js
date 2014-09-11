var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var secret = '123456789'

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use('/c', expressJwt({
    secret: secret
}));

require('./routes/api.js')(app, secret)


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        if (err) console.log(err)
        res.status(err.status || 500);
        res.send({
            stasus: err.status || 500,
            err: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    if (err) console.log(err)
    res.status(err.status || 500);
    res.send({
        stasus: err.status || 500,
        err: err
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
