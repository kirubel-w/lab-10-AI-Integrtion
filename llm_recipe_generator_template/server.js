
// Import Express, path, and body-parser
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// import the routes in routes/index.js
const indexRouter = require('./routes/index')

// Create the web application
const app = express()

// enable parsing of POST request form body
app.use(bodyParser.urlencoded({ extended: false }))

// serve static files, such as CSS
const staticFileLocation = path.join(__dirname, 'public')
app.use(express.static(staticFileLocation))

// configure app to use the Handlebars template engine and 
// work with template files in the views directory 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// make the routes in index.js available to the app 
app.use('/', indexRouter)

// Handle application errors by logging the error details
// to the console, and showing the user a web page with 
// a more user-friendly error message 
app.use(function (err, req, res, next) {
    // Log the error details in the console
    console.error(err.stack)

    // Display the error page with a 500 status code
    res.status(500).render('error')
})

// Identify port, or use default of 3000, then start server running 
const port = process.env.PORT || 3000
const server = app.listen(port, function () {
    // Display the port number when the server starts
    console.log('Express server running on port', port)
})
