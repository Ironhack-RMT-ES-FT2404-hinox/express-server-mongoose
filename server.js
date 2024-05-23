require("dotenv").config();

const express = require("express");
const app = express();

// conexión a la DB
// require("./db/index.js")
require("./db") // busca index.js dentro de /db y ejecutalo

// all middlewares & configurations here
const config = require("./config")
config(app)

// all routes here...
const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

// Gestores de errores
const errorHandlers = require("./error-handlers")
errorHandlers(app)

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
