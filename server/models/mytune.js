var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var schemaName = "Mytune"

var schema = new Schema({
    title: { type: String, required: true },
    albumArt: { type: String, required: false },
    artist: { type: String, required: true },
    price: { type: Number, required: false },
    preview: { type: String, required: true }
});

module.exports = mongoose.model(schemaName, schema)