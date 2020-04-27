// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const PORT = process.env.PORT || 4000;

const projectData = {}

//Helper Functions
const addData = ( req, res ) => {
    let data = req.body;
    let newEntry = {
        date: data.date,
        input: data.input,
        temp: data.temp
    }

    projectData.push( newEntry );
    return newEntry;
}

// Start up an instance of app
const app = express();


/* Dependencies */
/* Middleware*/
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use( cors() );

// Initialize the main project folder
app.use( express.static( 'src' ) );

// Spin up the server
// Callback to debug
app.listen( PORT, () => {
    console.log( `Listening at http://localhost:${ PORT }` );
} )

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get( '/all', ( req, res ) => {
    res.send( appData );
})

// Post Route
app.post( '/add', addData );
  