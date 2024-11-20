const mongoose = require("mongoose");

const dataSchemaObj = {
    song: { type: String, required: true },       // Reference to the song
    singerName: { type: String, required: true }, // Name of the singer
    lyricistName: { type: String, required: true }, // Name of the lyricist
    views: { type: String, required: true },          // Total views/listeners attributed to this singer/lyricist
};

const singerSchema = mongoose.Schema(dataSchemaObj);

module.exports = mongoose.model("Singer", singerSchema);
