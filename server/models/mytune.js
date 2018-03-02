var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var schemaName = "Mytune"

var schema = new Schema({
    trackName: { type: String, required: true },
    artworartworkUrl60: { type: String, required: false },
    artistName: { type: String, required: true },
    trackPrice: { type: Number, required: false },
    previewUrl: { type: String, required: true }
});

module.exports = mongoose.model(schemaName, schema)