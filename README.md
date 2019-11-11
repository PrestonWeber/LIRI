# LIRI

Liri is an application made to give you information on concerts. songs, and movies.  This application pulls arguments given in node, and uses them as commands to pull data for songs based on their names, upcoming concerts, or information about movies.  It also includes an external file with a command written to be used as well.


In order to use this app, you will need to start each command with 'node liri.js' followed by the following commands

["concert-this" + (band name)] = this will give you data the venue, city, country, date, and time.

["spotify-this-song" + (song name)] = This will give you information for the band, the song title, a spotify url to the song, and the album its from.

["movie-this" + (movie name)] = this will give you the title of the movie, year it was released, imdb rating, rotten tomatoes rating, metacritic rating, country of origin, plot summary, and the leading actors for movie you searched.

["do-what-it-says"] = this pulls a command that was written in the random.txt file.  In this example, it gives the command spotify-this-song,"I Want it That Way"

In order to accomplish this, I created a switch case function that pulls the user command, and calls upon the function for each command.  

I created a concert results function that uses axios to pull data from the bands in town api.  I created a for loop to get each of the concerts, and used that in a console.table to display it.

I created a movie results function that also used axios to get movie information from omdb api.  I used my own linebreak functions because I didn't like the way the data was displaying in the console.table for this one.

for the song results function I used the node-spotify-api package, and queried the user input.  I created an error function for if it errored, else it would display on the a console.table.

The follow command function used the file system to read the file listed as random.txt within that it created a command variable to turned the data into a string the split into an array at the comma.  from there, I had it run the run user command function with arguments passed in from the array.



