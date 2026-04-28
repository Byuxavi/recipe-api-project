const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true }, // Un arreglo de textos
    instructions: { type: String, required: true },
    prepTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, required: true },
    category: { type: String, required: true },
    calories: { type: Number, required: false } // Campo extra opcional
});

module.exports = mongoose.model('Recipe', recipeSchema);