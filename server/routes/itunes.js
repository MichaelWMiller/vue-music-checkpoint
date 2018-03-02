var router = require("express").Router();
var Itunes = require("../models/itune.js")

//GET SONGS BY ARTIST
router.get("api/itunes/:artist", (req, res, next) => {
    Itunes.find({ artist: req.params.artist })
        .then(itunes => {
            return res.send(itunes);
        })
        .catch(next);
})