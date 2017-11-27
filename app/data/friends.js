//====================================================================//
// Dependencies
//====================================================================//

const fs = require('fs');
// file system package

const file = './app/data/tennisPartners.json';
// current list of tennis partners

//====================================================================//
// Functions
//====================================================================//

// Updates external json file
function updateFile(object){
    if (!fs.existsSync(file)){
        // if there is no tennisPartners.json file create one
        fs.writeFileSync(file, "[" + JSON.stringify(object) + "]");
        // else read the existing file
    } else {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            }
            let myArray = [];
            if (data) {
                myArray = JSON.parse(data);
            }
            myArray.push(object);
            // Add new tennis players to the tennisPartners.json file / indentation 5
            fs.writeFile(file, JSON.stringify(myArray, null, 5), (err) => {
                if (err) console.log (err);
            });
        });
    }
}

// Reads tennisPartners.json using promises (* See below). 
function displayFriends(){
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) =>{
            if(err) {
                reject(err);
            } 
            let myArray = [];
                if (data) {
                    myArray = JSON.parse(data);
                }
                resolve(myArray);
        });

    })
}
// * A Promise is a proxy for a value not necessarily known when the promise is created. 
// It allows you to associate handlers with an asynchronous action's eventual 
// success value or failure reason. 
// This lets asynchronous methods return values like synchronous methods: instead of 
// immediately returning the final value, the asynchronous method returns a promise to 
// supply the value at some point in the future.



// Matching algorithm
function matchPlayers(obj){
    return new Promise((resolve, reject) => {

        displayFriends().then((tennisPals) => {

            let playerScores = obj.scores;
            
            playerScores.map((num) => parseInt(num));
            // convert strings to numbers

            let closestMatch = {
                name: '',
                photo: '',
                scores: []
            }

            let lowestDelta = 50;

            tennisPals.forEach((e, i) => {
                // Compute Delta between current user and previous scores stored in array
                let delta = e.scores.map((e) => parseInt(e))
                // Reduce the scores array into a single value
                .reduce((total, value, index) => {
                    return total + Math.abs(value - playerScores[index]);
                });
                    if (delta < lowestDelta){
                        lowestDelta = delta;
                        closestMatch = tennisPals[i];
                    }
            });
            // stores user into JSON file
            updateFile(obj);
            resolve(closestMatch);
        }).catch((err) => {if (err) reject (err);});
    });
}

//====================================================================//
// Export Functions to apiRoutes.js
//====================================================================//

exports.updateFile = updateFile;
exports.displayFriends = displayFriends;
exports.matchPlayers = matchPlayers;
