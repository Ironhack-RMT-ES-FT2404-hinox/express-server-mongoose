const router = require("express").Router()

const Artist = require("../models/Artist.model.js")

// Aqui todas nuestras rutas de funcionalidades principales de artistas

// POST "/api/artist" Ruta para crear artistas en la DB
router.post("/", (req, res, next) => {

  console.log(req.body)

  // para crear documentos usamos el modelo y el metodo .create()
  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then((response) => {
    console.log("artista creado")
    res.sendStatus(201) // enviar codigo sin data
    // res.status(201).json({artistId: response.artistId}) // enviar codigo con data
  })
  .catch((error) => {
    next(error)
  })

})

// Ruta para buscar artistas en la DB
// app.get("/artist", async (req, res, next) => {
//   try {
//     const response = await Artist.find() // busca todos los documentos de esta colección
//     .select({name: 1, genre: 1})
//     // console.log(response)
//     res.json(response) // entregamos al cliente todos los artistas

//   } catch (error) {
//     console.log(error)
//   }
// })

//* la Ruta de arriba es reemplazada por esta
// GET "/api/artist" Ruta para buscar artistas en la DB. Permite utilizar queries para busquedas personalizadas.
router.get("/", async (req, res) => {
  console.log("usuario accediendo a ruta search")
  console.log(req.query)
  try {
    const response = await Artist.find( req.query )
    .select({name: 1, genre: 1})
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

// GET "/api/artist/:artistId" Ruta para buscar detalles de una artista por su id
router.get("/:artistId", async (req, res) => {

  console.log("usuario accediendo a la ruta")

  // como recibimos el id que me pide el cliente
  console.log(req.params)

  // como usamos ese id para buscarlo en la DB
  try {
    
    const response = await Artist.findById(req.params.artistId)
    res.status(200).json(response)

  } catch (error) {
    next(error)
  }

})

// DELETE "/api/artist/:artistId" Ruta para borrar artista
router.delete("/:artistId", async (req, res, next) => {

  try {
    
    await Artist.findByIdAndDelete(req.params.artistId)
    res.sendStatus(202)

  } catch (error) {
    next(error) // si yo a next le paso un argumento, automaticamente la llamada es dirijida a el gestor de errores 500.
  }

})

// PUT "/api/artist/:artistId" Ruta para editar (Total) artista
router.put("/:artistId", async (req, res) => {

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      isTouring: req.body.isTouring,
      genre: req.body.genre
    }, {new: true})
    // response es el documento antes de la actualización
    // con {new: true} forzamos a mongo a devolvernos el documento despues de la actualización

    // res.sendStatus(202)
    // suponemos que el cliente tienen la necesidad recibir el artista modificado
    res.status(200).json(response)

  } catch (error) {
    next(error)
  }

})

// PATCH "/api/artist/:artistId/genre/:genre" Ruta para editar (Parcial) artista
router.patch("/:artistId/genre/:genre", async (req, res) => {

  try {
    
    await Artist.findByIdAndUpdate(req.params.artistId, {
      $addToSet: { genre: req.params.genre }
    })

    res.sendStatus(202)

  } catch (error) {
    next(error)
  }

})

module.exports = router