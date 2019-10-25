var dotenv = require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");


 
console.log(keys.spotify.id);

var userCommand = process.argv[2];

var userInput = process.argv[3];

var runUserCommand = function () {
    if (userCommand === "concert-this") {
        concertResults();
    } else if (userCommand === "spotify-this-song") {
        songResults();
    } else if (userCommand === "movie-this") {
        movieResults();
    } else if (userCommand === "do-what-it-says") {
        followCommand();
    } else {
        console.log("That is not a command");
    }
}

var concertResults = function () {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                console.log(response.data[i].venue.country);
                console.log(response.data[i].datetime);
                
            }
        })
        .catch(function (error) {
          console.log(error);
        })
}

runUserCommand();