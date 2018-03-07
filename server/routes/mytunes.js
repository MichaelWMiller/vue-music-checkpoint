var router = require("express").Router();
var Mytunes = require("../models/mytune")

// //GET MYTUNES BY id
router.get("/api/mytunes/:id", (req, res, next) => {
    Mytunes.findById(req.params.id)
        .then(mytunes => {
            return res.send(mytunes);
        })
        .catch(next);
})

//GET ALL MyTunes
router.get("/api/mytunes", (req, res, next) => {
    debugger
    Mytunes.find()
        .then(mytunes => {
            return res.send(mytunes);
        })
        .catch(next)
})

// //Delete MyTune
router.delete("/api/mytunes/:id", (req, res, next) => {
    Mytunes.findByIdAndRemove(req.params.id)
        .then(mytune => {
            res.send({ message: "Successfully deleted mytune" })
        })
        .catch(next)
})

//Create MyTune 

router.post("/api/mytunes", (req, res, next) => {

    Mytunes.create(req.body)
        .then(tune => {
            res.send(tune);
        })
        .catch(next)
})

router.put("/api/mytunes/:_id", (req, res, next) => {

    Mytunes.update(req.body, { new: true })
        .then(tune => {
            res.send({ message: "Successfully updated post", data: tune })
        })
        .catch(next)
})


module.exports = { router };