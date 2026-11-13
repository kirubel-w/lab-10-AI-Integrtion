
const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')

// home page here
// Display the form where users enter their ingredients
router.get('/', function (req, res, next) {
    res.render('enter_ingredients')
})

// Handle the form submission when the user requests a recipe
router.post('/generate_recipe', function (req, res, next) {
    // Get the submitted form data
    let formData = req.body

    // Get the ingredients entered by the user
    let userIngredients = formData.ingredients

    // Display the user's ingredients in the console
    console.log('User entered:', userIngredients)

    // make a Gemini request
    // Send the ingredients to the recipe generator
    generateRecipe(userIngredients).then(recipeJSON => {
        // Display the generated recipe and user's ingredients on the result page
        return res.render('recipe_result', { userIngredients: userIngredients, recipeJSON: recipeJSON })
    }).catch(err => {
        // Pass any errors to Express error handling
        return next(err)
    })
})

// Export the router so it can be used by the Express application
module.exports = router
