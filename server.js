var express = require('express');
var http = require('http');

var mongoose = require('mongoose'),
    User = require('./userModel');

var connStr = 'mongodb://localhost/mongoose-bcrypt-test';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    username: 'user',
    password: 'Password123'
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

    // attempt to authenticate user
    User.getAuthenticated('user', 'Password123', function(err, user, reason) {
        if (err) throw err;

        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log('login success');
            return;
        }

        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
                break;
            case reasons.MAX_ATTEMPTS:
                // send email or otherwise notify user that account is
                // temporarily locked
                break;
        }
    });
});

var app = express();

var compression = require('compression');
app.use(compression());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());

var path = require('path');
app.use(express.static(path.join(__dirname, 'app'))).use('/app/js/lib', express.static(path.join(__dirname, 'node_modules/requirejs')));

http.createServer(app).listen(8080);

console.log('server on http://localhost:8080');
