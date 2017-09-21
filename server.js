// Dependencies
const   express = require('express')
        bodyParser = require('body-parser')
        logger = require('morgan')
        mongoose = require('mongoose');
        // Require Note and Article models
        Note = require('./models/Note.js')
        Article = require('./models/Article.js')
        // Scraping tools
        request = require('request')
        cheerio = require('cheerio');
        // Set Mongoose to leverage built in JavaScript ES6 promises
        mongoose.Promise = Promise;

        // Initialize Express
        app = express();

// Use Morgan and Body Parser with the app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Static dir is public
app.use(express.static('public'));

// Configure database for Mongoose
mongoose.connect('mongodb://heroku_w476c97l:g4n3fk0sk6vmejhect6m87bbj3@ds141464.mlab.com:41464/heroku_w476c97l');
let db = mongoose.connection;

// Show Mongoose errors
db.on('error', function(error) {
    console.log('Mongoose Error: ', error);
});

// Once user is logged in to the db via Mongoose, log a success message
db.once('open', function() {
    console.log('Mongoose connection successful.');
});




