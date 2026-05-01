const router = require('express').Router();
const swaggerUi = require('swagger-ui-express'); //  (el motor visual).
const swaggerDocument = require('../swagger.json'); // Contiene la descripción técnica de tu API en un formato que las máquinas entiendenes 
const passport = require('passport'); //semana 4

// Aquí puedes añadir una ruta de bienvenida para saber que el servidor vive
router.get('/', (req, res) => {
    // Verificamos si el usuario existe en la sesión
    if (req.user) {
        res.send(`Logged in as ${req.user.displayName || req.user.username}`); // se agrega el nombre del usuario logueado
    } else {
        res.send('Logged Out');
    }
});

router.use('/api-docs', swaggerUi.serve); // El use prepara el terreno y sirve esos archivos auxiliares.
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); // El get es el que finalmente entrega la página principal ya armada.

// Aquí conectamos todas las rutas de recetas
router.use('/recipes', require('./recipes'));

//semana 4 
// Iniciar proceso de login
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Callback (donde GitHub te devuelve)
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user; // Guardamos al usuario en la sesión
    res.redirect('/');
  }
);

// Logout
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;