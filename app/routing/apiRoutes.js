//====================================================================//
// API Routes
//====================================================================//

const friends = require('../data/friends.js');
// require friends.js and store it on 'friends' variable.

module.exports = function(app){
// export GET and POST routes

        app.get('/api/friends', (req, res) => {

            friends.displayFriends()
                // chaining promises
                .then((tennisPals) => res.json(tennisPals))
                .catch((err) => {if (err) console.log(err)}); // reject
        });


        app.post('api/friends', (req, res) => {
                // chaining promises
            friends.matchPlayers(req.body)
                .then((friend) => {
                    res.json(friend);
                })
                .catch((err) => {
                    if (err) console.log(err);})
        });
}