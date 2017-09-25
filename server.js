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

// Routes

// Index route
app.get('/', function(req, res) {
    res.send(index.html);
}); 

// GET request to scrape the NPR website
app.get('/scrape', function(req, res) {
    // Grab body of the html with request
    request('http://www.npr.org/', function(error, response, html) {
        // Load that into cheerio to save it to $, a shorthand selector
        let $ = cheerio.load(html);
        // Grab every h2 within an article tag, and do the following
        $('article h2').each(function(i, element) {
            // Save an empty result object
            let result = {};
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).children('a').text();
            result.link = $(this).children('a').attr('href');
            // Using the Article model, create a new entry
            // This essentially passes the result object to the entry, as well as the title and link
            let entry = new Article(result);

            // Save that entry to the db
            entry.save(function(error, doc) {
                // Log any erros
                if (error) {
                    console.log(error);
                }
                // Or log the doc
                else {
                    console.log(doc);
                }
            });
        });
    });
    // Tell the browser that we have finished scraping the text
    res.send('Scrape: Complete!');
});

// This gets the articles scraped from the mongoDB
// applicationCache.get('/articles', function(req, res) {
app.get('/articles', function(req, res) {
    // Grab every doc in the Articles array
    Article.find({}, function(error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Otherwise send the doc to the browser as a JSON object
        else {
            res.json(doc);
        }
    });
});

// Grab an article by its ObjectId
// app.get('/articles/:id', function(req, res) {
app.get('/articles:id', function(req, res) {
    // Using the ID passed into the ID parameter, prepare a query that finds the matching one in the db
    Article.findOne({ '_id': req.params.id })
    // Populate all of the notes associated with it
    .populate('note')
    // execute query
    .exec(function(error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Otherwise, send the doc to the browser as a JSON object
        else {
            res.json(doc);
        }
    });
});

// // Grab an article by its ObjectId
// app.get('/articles/:id', function(req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in the db
//     Article.findOne({ '_id': req.params.id })
//     // Populate all of the notes associated with
//     .populate('note')
//     // Execute query
//     .exec(function(error, doc) {
//         // Log any errors'q
//         if (error) {
//             consle.log(error);
//         }
//         // Otherwise, send the doc to the browswer as a json object
//         else {
//             res.json(doc);
//         }
//     });
// });

// Create a new note or replace an existing one
app.post('/articles/:id', function(req, res) {
    // Create a new then pass the req.body to the entry
    let newNote = new Note(req.body);
    // Save the new note to the db
    newNote.save(function(error, doc) {
        // log errors, if any
        if (error) {
            console.log(error);
        }
        // otherwise, 
        else {
            // Use the article id to find and update its note
            Article.findOneAndUpdate({ '_id': req.params.id }, {'note': doc._id })
            // Then execute above query
            .exec(function(error, doc) {
                // if any errors, log them
                if (error) {
                    console.log(error)
                }
                // otherwise, send the doc to the browser
                else {
                    res.send(doc)
                }
            });
        }
    });
});

// listen up, port 3000!
app.listen(3000, function() {
    console.log('App up and running on port 3000.')
})


