//====================================================================//
// Dependencies
//====================================================================//

const path = require('path');


//====================================================================//
// Routing
//====================================================================//


module.exports = function(app) {

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/home.html'));
        });  // Home page route

        app.get('/survey', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/survey.html'));
        }); // Survey route
};