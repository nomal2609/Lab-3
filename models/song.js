const mongoose = require("mongoose");

const schemaObj = {
    name: { type: String, required: true },       // Name of the song
    releaseDate: { type: Date, required: true }, // Release date of the song
    language: { type: String, required: true },  // Language of the song
    genre: { 
        type: String, 
        enum: ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Country', 'Electronic', 'Folk', 'Other'], // Predefined genres
        required: true 
    },
};

const mongooseSchema = mongoose.Schema(schemaObj);

module.exports = mongoose.model("Song", mongooseSchema);
