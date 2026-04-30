const Recipe = require('../models/recipe');
const mongoose = require('mongoose');

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
        // Error 400 si fallan los campos requeridos (validación)
        res.status(400).json({ message: error.message });
    }
};

// UPDATE a recipe
const updateRecipe = async (req, res) => {
    // Validación de formato de ID (Manejo de errores)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const recipeId = req.params.id;
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId,
            {
                title: req.body.title,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                prepTime: req.body.prepTime,
                servings: req.body.servings,
                difficulty: req.body.difficulty,
                category: req.body.category,
                calories: req.body.calories
            },
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a recipe
const deleteRecipe = async (req, res) => {
    // Validación de formato de ID (Manejo de errores)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const recipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAll, createRecipe, updateRecipe, deleteRecipe };