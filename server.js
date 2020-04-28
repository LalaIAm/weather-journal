// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const PORT = process.env.PORT || 4000;

let data = []
let projectData = {};


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
function callBack ( req, res ) {
    res.send('POST received')
}

app.post( '/add', callBack );

  
const addData = (req, res) => {
    const newData = req.body;
    projectData.date = newData.date;
    projectData.input = newData.input;
    projectData.temp = newData.temp;
    console.log(projectData)
    return projectData;
};

const sendData = ( req, res ) => {
    console.log(projectData)
    res.send( projectData );
}

// Callback function to complete GET '/all'
app.get( '/all', sendData );

// Post Route
app.post( '/info', addData );
