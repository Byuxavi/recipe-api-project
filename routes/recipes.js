const router = require('express').Router();
const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);
router.post('/', recipesController.createRecipe);

module.exports = router;