var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var schemaName = "Mytune"

var schema = new Schema({
    trackName: { type: String, required: true },
    artworkUrl130: { type: String, required: false },
    artistName: { type: String, required: true },
    price: { type: Number, required: false },
    previewUrl: { type: String, required: true }
});

module.exports = mongoose.model(schemaName, schema)