var mongoose = require("mongoose");
console.log('mongodb://test:test@ds044907.mlab.com:44907/mwm-db')
var connectionString = "";

var connection = mongoose.connection;
mongoose.connect(connectionString);

connection.on("error", err => {
    console.error("mlab Error: ", err);
});

connection.once("open", () => {
    console.log("connected to database");
});