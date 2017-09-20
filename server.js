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

