const router = require('express').Router();

// Aquí puedes añadir una ruta de bienvenida para saber que el servidor vive
router.get('/', (req, res) => {
    res.send('Welcome to the Recipe API!');
});

// Aquí conectamos todas las rutas de recetas
router.use('/recipes', require('./recipes'));

module.exports = router;