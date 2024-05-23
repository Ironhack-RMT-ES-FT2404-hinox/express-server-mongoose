const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releasedDate: {
    type: Date
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist"// indica la referencia de la colección/modelo al cual está relacionada esta propiedad. El valor es el nombre del Modelo
  }
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song