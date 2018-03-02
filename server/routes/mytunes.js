var router = require("express").Router();
var Mytunes = require("../models/mytune.js")

//GET SONGS BY TRACKID
router.get("api/itunes/:trackId", (req, res, next) => {
    Mytunes.find({ trackId: req.params.trackid })
        .then(itunes => {
            return res.send(itunes);
        })
        .catch(next);
})

//GET ALL MyTunes
router.get("/api/mytunes", (req, res, next) => {
    Mytunes.find(req.query)
        .then(mytunes => {
            return res.send(mytunes);
        })
        .catch(next)
})

//Delete MyTune
router.delete("/api/mytunes/:trackId", (req, res, next) => {
    Mytunes.findByIdAndRemove(req.params.trackId)
        .then(mytune => {
            res.send({ message: "Successfully deleted mytune" })
        })
        .catch(next)
})

//Create MyTune 

router.post("/api/mytunes", (req, res, next) => {
    Mytunes.create(req.body)
        .then(post => {
            res.send(post);
        })
        .catch(next)
})

module.exports = { router };