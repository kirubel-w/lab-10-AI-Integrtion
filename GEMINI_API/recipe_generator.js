// Import GoogleGenAI and Type from the Google GenAI library
let { GoogleGenAI, Type } = require('@google/genai')

// Create a Google GenAI instance
let genAI = new GoogleGenAI({})

// Define the ingredients provided by the user
let userInput = 'eggs and broccoli and leftover chicken'

// Create a prompt using the user's ingredients
let prompt = `Suggest one recipe that uses these ingredients.
Ingredients: ${userInput}`

// Send a request to the Gemini API to generate a recipe
genAI.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: prompt,
    config: {
        // Define the AI's role and recipe requirements
        systemInstruction: `You are a recipe suggestion bot for a health-conscious, budget-friendly website. Suggest recipes that are low cost but use healthy ingredients`,

        // Request the response in JSON format
        responseMimeType: 'application/json',

        // Define the structure of the JSON response
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                // Recipe name as a string
                recipeName: {
                    type: Type.STRING
                },
                // Recipe description as a string
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
    // Display the generated JSON response in the console
    console.log(response.text)

    // Convert the JSON response into a JavaScript object
    let recipe = JSON.parse(response.text)
})