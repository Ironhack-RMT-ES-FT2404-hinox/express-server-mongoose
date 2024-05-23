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