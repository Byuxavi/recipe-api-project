const validator = require('validatorjs');

const saveRecipe = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    ingredients: 'required|array',
    instructions: 'required|string',
    prepTime: 'required|integer',
    servings: 'required|integer',
    difficulty: 'required|string',
    category: 'required|string'
  };

  const validation = new validator(req.body, validationRule);
  if (validation.fails()) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: validation.errors.all()
    });
  } else {
    next();
  }
};

module.exports = {
  saveRecipe
};