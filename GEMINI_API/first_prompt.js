// Import GoogleGenAI from the Google GenAI library
let { GoogleGenAI } = require('@google/genai');

// Create a Google GenAI instance
let genAI = new GoogleGenAI({})

// Send a request to the Gemini API with a question
genAI.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: 'what is an environment variable?'
}).then(response => console.log(response.text)) // Display the AI-generated response in the console