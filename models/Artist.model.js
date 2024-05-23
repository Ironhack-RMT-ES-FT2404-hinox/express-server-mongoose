const mongoose = require("mongoose")

// creamos el esquema
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // el campo es obligatorio
    unique: true // no se pueden duplicar. valor unico.
  },
  awardsWon: {
    type: Number,
    min: 0, // valor minimo posible
    default: 0 // valor predeterminado en caso que el cliente no lo entregue
  },
  isTouring: Boolean,
  genre: {
    type: [String],
    enum: ["rock", "alternative", "pop", "metal", "country", "jazz"] // estos son los unicos posibles valores de esta propiedad
  },
  collaborator:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist"
    }
})

// creamos el modelo => la manito que nos permitirá ir a la BD (colección de artistas)
const Artist = mongoose.model("Artist", artistSchema)
// 1. El nombre interno con el que se conce el modelo/colección (SIEMPRE EN INGLES Y SINGULAR)
// 2. El esquema

module.exports = Artist // usar el modelo en cualquier lugar del servidor