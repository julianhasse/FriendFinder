
// ====================================================================//
// Match(point) - Find your tennis partner, love!
// author: Julian Hasse
// [2017/11/22]  
// ====================================================================//


// ====================================================================//
// Dependencies
// ====================================================================//

const express = require('express');
// Express package.
const bodyParser  = require('body-parser');
// Middleware loaded via require.
const path = require('path');
// Provides utilities for working with file and directory paths.

const app = express();
// Express init.
const PORT = process.env.PORT || 3000;
// Assign port number with safe option for Heroku.


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type:'application/vnd.api+json' }));
// This is for our server to interpret data sent to it.


// ====================================================================//
// Router
// ====================================================================//

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// ====================================================================//
// Server startup
// ====================================================================//
app.listen(PORT, () => {
    console.log('MatchPoint is listening on PORT: ' + PORT)
});




