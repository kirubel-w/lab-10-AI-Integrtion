
// LLM request here
// Import GoogleGenAI and Type from the Google GenAI library
let { GoogleGenAI, Type } = require('@google/genai')

// Create a Google GenAI instance
let genAI = new GoogleGenAI({})

// Function to generate a recipe using the user's ingredients
function generateRecipe(ingredients) {

    // Create a prompt using the ingredients provided by the user
    let prompt = `Suggest one recipe that uses these ingredients.
    Ingredients: ${ingredients}`

    // Send a request to the Gemini API to generate a recipe
    return genAI.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
        config: {
            // Define the AI's role and recipe requirements
            systemInstruction: `You are a recipe suggestion bot for a health-conscious,
            budget-friendly website. Suggest recipes that are low cost but use healthy ingredients Follow these rules:
            1. Only use safe, edible ingredients. If the user enters non-food items like engine oil or plastic, do not generate a recipe.
            2. Follow any food allergies or dietary restrictions mentioned by the user. Never suggest ingredients that conflict with those restrictions.
            3. Use the ingredients provided by the user. Do not assume they have other ingredients available.
            4. If the user does not provide enough ingredients to make a reasonable recipe, do not make up a recipe.
            5. If you cannot generate a safe recipe, explain the reason clearly instead of suggesting one.
            6. If the ingredients are valid, suggest one simple, healthy, and affordable recipe.         
            7. If a recipe can be generated, set success to true and errorMessage to an empty string.
            8. If a recipe cannot be generated, set success to false and explain why in errorMessage.
            9. When success is false, return an empty recipeName and description, and empty ingredients and instructions arrays.`,

            // Request the response in JSON format
            responseMimeType: 'application/json',

            // Define the structure of the JSON response
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    // Shows whether a recipe was generated successfully
                    success: {
                        type: Type.BOOLEAN
                    },
                    // Explains why a recipe could not be generated
                    errorMessage: {
                        type: Type.STRING
                    },
                    // Name of the generated recipe
                    recipeName: {
                        type: Type.STRING
                    },
                    // Short description of the recipe
                    description: {
                        type: Type.STRING
                    },
                    // List of ingredients as an array of strings
                    ingredients: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
                    // Cooking instructions as an array of strings
                    instructions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                }
            }
        }
    }).then(response => {
        // Display the API response in the console
        console.log(response.text)

        // Convert the JSON response into a JavaScript object
        let recipe = JSON.parse(response.text)

        // Display the recipe object in the console
        console.log(recipe)

        // Return the generated recipe
        return recipe
    })
}



// Export the function so it can be used in other files
module.exports = generateRecipe
