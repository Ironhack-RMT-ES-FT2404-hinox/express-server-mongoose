function errorHandlers(app) {

  // 404 not found
  app.use((req, res) => {
    res.status(404).json({errorMessage: "Ruta no encontrada"})
  })

  // 500 internal server error
  app.use((err, req, res, next) => {
    // detecta si esta funcion tiene exactamente 4 argumentos, entonces esto es un gestor de error 500

    console.log(err)
    res.status(500).json({errorMessage: "Problemas con el servidor. Intente más tarde."})

  })

}

module.exports = errorHandlers