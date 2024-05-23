const router = require("express").Router()

// aqui definimos todas nuestras rutas sobre obj router
router.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

// index.routes funcionará como controlador de rutas
const artistRouter = require("./artist.routes.js")
router.use("/artist", artistRouter)

const songRouter = require("./song.routes.js")
router.use("/song", songRouter)

module.exports = router