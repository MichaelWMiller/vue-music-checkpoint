var express = require('express');
var bp = require('body-parser')
var cors = require('cors')
var server = express();

var port = 3000
var mytunesRoutes = require("./routes/mytunes")
var port = 3000;

require("./db/mlab-config");


var whitelist = ['http://localhost:8080']
var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhiteListed = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhiteListed);
    },
    credentials: true
}

server.use(cors(corsOptions));
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(mytunesRoutes.router)

server.use("*", (error, req, res, next) => {
    res.status(400).send(error);
});

server.listen(port, () => {
    console.log("the server is running... Port:", port);
});