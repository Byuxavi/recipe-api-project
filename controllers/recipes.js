const Recipe = require('../models/recipe');

// GET all recipes
const getAll = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST create recipe
const createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe({
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            prepTime: req.body.prepTime,
            servings: req.body.servings,
            difficulty: req.body.difficulty,
            category: req.body.category,
            calories: req.body.calories
        });

        const savedRecipe = await recipe.save();
        res.status(201).json(savedRecipe._id);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAll, createRecipe };