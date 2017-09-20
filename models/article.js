// Requires Mongoose
const mongoose = require('mongoose');
// Creates Schema class
const Schema = mongoose.Schema;
// Creates article schema
let ArticleSchema = new Schema({
    // title is a required string
    title: {
        type: String,
        required: true
    },
    // link is a required string
    link: {
        type: String,
        required: true
    },
    // Saves one note's ObjectId. ref refers to the Note model
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

// Creates the Article model with the ArticleSchema
let Article = mongoose.model('Article', ArticleSchema);

// Exports the model
module.exports = Article;
