// Require Mongoose
const mongoose = require('mongoose');
// Create a schema class
const Schema = mongoose.Schema;

// Create the Note schema
let NoteSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

// Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create the Note model with the NoteSchema
let Note = mongoose.model('Note', NoteSchema);

// Export the Note model
module.exports = Note; 