const Song = require("../models/Song.model")
const Artist = require("../models/Artist.model")

const router = require("express").Router()


// POST "/api/song" => crear una cancion
router.post("/", async (req, res, next) => {
  console.log(req.body)
  try {
    await Song.create({
      title: req.body.title,
      releasedDate: req.body.releasedDate,
      artist: req.body.artist
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

// GET "/api/song/:songId" detalles de cancion
router.get("/", async(req, res, next) => {

  try {
    
    const response = await Song.find()
    .populate("artist", "name isTouring") // en vez de un id, busca el documento relacionado a ese id y devuelvemelo
    // const response2 = await Artist.findById(response.artist)
    console.log(response)
    res.status(200).json(response)

  } catch (error) {
    next(error)
  }

})


module.exports = router

// comentario dne dev
console.log("cambiando cosillas")