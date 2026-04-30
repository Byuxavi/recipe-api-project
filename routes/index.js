const router = require('express').Router();
const swaggerUi = require('swagger-ui-express'); //  (el motor visual).
const swaggerDocument = require('../swagger.json'); // Contiene la descripción técnica de tu API en un formato que las máquinas entiendenes 

// Aquí puedes añadir una ruta de bienvenida para saber que el servidor vive
router.get('/', (req, res) => {
    res.send('Welcome to the Recipe API!');
});

router.use('/api-docs', swaggerUi.serve); // El use prepara el terreno y sirve esos archivos auxiliares.
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); // El get es el que finalmente entrega la página principal ya armada.

// Aquí conectamos todas las rutas de recetas
router.use('/recipes', require('./recipes'));

module.exports = router;