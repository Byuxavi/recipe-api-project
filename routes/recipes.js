const router = require('express').Router();
const recipesController = require('../controllers/recipes');
const { isAuthenticated } = require('../middleware/authenticate'); //semana4 
const validation = require('../middleware/validate');
router.get('/', recipesController.getAll);
router.post('/', recipesController.createRecipe);
//semana 3 router.put('/:id', recipesController.updateRecipe);
//semana 3 router.delete('/:id', recipesController.deleteRecipe);
// SOLO los logueados pueden hacer esto (añadimos isAuthenticated antes del controlador)
router.post('/', isAuthenticated, validation.saveRecipe, recipesController.createRecipe);
router.put('/:id', isAuthenticated, validation.saveRecipe, recipesController.updateRecipe);
router.delete('/:id', isAuthenticated, recipesController.deleteRecipe);
module.exports = router;