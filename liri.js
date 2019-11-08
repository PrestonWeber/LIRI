var dotenv = require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require("node-spotify-api");

var fs = require("fs");

const cTable = require("console.table");

var spotify = new Spotify(keys.spotify);
 
console.log(keys.spotify.id);

var userCommand = process.argv[2];

var userInput = process.argv.slice(3).join(" ");

function lineBreak(){
    console.log("--------------------------------------");
}
function seperator(){
    console.log("\n")
}

var runUserCommand = function (command, input) {


    switch (command) {
        case "concert-this":
            concertResults(input);
        break;
        case "spotify-this-song":
            songResults(input);
        break;
        case "movie-this":
            movieResults(input);
        break;
        case "do-what-it-says":
            followCommand(input);
            break;
        default: 
            console.log("that is not a command");
            break;
    }
}

var concertResults = function (input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.table([
                    {
                        Venue: response.data[i].venue.name,
                        City: response.data[i].venue.city,
                        Country: response.data[i].venue.country,
                        Date_and_Time: response.data[i].datetime
                    }
                ])
                
            }
        })
        .catch(function (error) {
          console.log(error);
        })
}



function movieResults(input) {
    
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + input)
    .then(function(response) {
        
            seperator();
            console.log("Title: " + response.data.Title);
            lineBreak();
            console.log("Year Released: " + response.data.Year);
            lineBreak();
            console.log("Imdb: " + response.data.Ratings[0].Value);
            lineBreak();
            console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value)
            lineBreak();
            console.log("Metacritic: " + response.data.Ratings[2].Value)
            lineBreak();
            console.log("Country: " + response.data.Country);
            lineBreak();
            console.log("Plot Summary: " + response.data.Plot);
            lineBreak();
            console.log("Leading Actors: " + response.data.Actors);
        
    })
    .catch(function (error) {
        console.log(error);
    })
}



var songResults = function(input) {
    spotify.search({
        type: "track",
        query: input,
        
        
    }, function(err, data) {
        if (err) {
            return console.log("Error occured: " + err);
        }else{
            var info = data.tracks.items[0];
           console.table([{
            artist: info.artists[0].name, 
            Song: info.name, 
            URL: info.external_urls.spotify, 
            album: info.album.name
            }]);

            
        }
    });
}


function followCommand(){
    fs.readFile(__dirname + "/random.txt", function(err, data) {
        if (err) throw err;
        console.log(data.toString());
        var command = data.toString().split(",");
        runUserCommand(command[0], command[1]);
    })
}


runUserCommand(userCommand, userInput);