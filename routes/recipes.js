const router = require('express').Router();
const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);
router.post('/', recipesController.createRecipe);
router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;