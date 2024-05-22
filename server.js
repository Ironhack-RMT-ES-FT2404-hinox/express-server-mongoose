require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// conexión a la DB
const mongoose = require("mongoose")

//                            home  puerto DB  nombre DB
//                              |       |         |
mongoose.connect("mongodb://127.0.0.1:27017/artists-db")
.then(() => {
  console.log("conectados a la base de datos, yay!")
})
.catch(() => {
  console.log("todo mal, hubo un problema al conectar a la BD")
})



// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


const Artist = require("./models/Artist.model.js")

// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})


// Ruta para crear artistas en la DB
app.post("/artist", (req, res, next) => {

  console.log(req.body)

  // para crear documentos usamos el modelo y el metodo .create()
  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    console.log("artista creado")
    res.json({message: "Todo bien, artista creado"})
  })
  .catch((error) => {
    console.log(error)
    res.json("hubo un error") // esto lo gestionaremos mejor mañana
  })

})

// Ruta para buscar artistas en la DB
app.get("/artist", async (req, res, next) => {

  try {
    
    const response = await Artist.find() // busca todos los documentos de esta colección
    // console.log(response)
    res.json(response) // entregamos al cliente todos los artistas

  } catch (error) {
    console.log(error)
  }

})

app.get("/artist/search", async (req, res) => {

  console.log("usuario accediendo a ruta search")

  console.log(req.query)

  try {
    
    const response = await Artist.find( req.query )
    .select({name: 1, genre: 1})
    res.json(response)

  } catch (error) {
    console.log(error)
    res.json("todo mal")
  }

})

// Ruta para buscar detalles de una artista por su id
app.get("/artist/:artistId", async (req, res) => {

  console.log("usuario accediendo a la ruta")

  // como recibimos el id que me pide el cliente
  console.log(req.params)

  // como usamos ese id para buscarlo en la DB
  try {
    
    const response = await Artist.findById(req.params.artistId)
    res.json(response)

  } catch (error) {
    console.log(error)
    res.json("errooooooooor")
  }

})


// Ruta para borrar artista
app.delete("/artist/:artistId", async (req, res) => {

  try {
    
    await Artist.findByIdAndDelete(req.params.artistId)
    res.json("artista borrado")

  } catch (error) {
    console.log(error)
  }

})

// Ruta para editar (Total) artista
app.put("/artist/:artistId", async (req, res) => {

  try {
    
    await Artist.findByIdAndUpdate(req.params.artistId, {
      name: req.body.name,
      awardsWon: req.body.awardsWon,
      isTouring: req.body.isTouring,
      genre: req.body.genre
    })

    res.json("artista editado, todo bien")

  } catch (error) {
    console.log(error)
  }

})

// Ruta para editar (Parcial) artista
app.patch("/artist/:artistId/add-genre/:genre", async (req, res) => {

  try {
    
    await Artist.findByIdAndUpdate(req.params.artistId, {
      $addToSet: { genre: req.params.genre }
    })

    res.json("todo bien")

  } catch (error) {
    console.log(error)
  }

})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
