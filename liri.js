// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Load the required nodes

var Twitter = require('twitter'); //npm install twitter
var Spotify = require('node-spotify-api'); //npm install --save node-spotify-api
var omdb = require('omdb'); //npm install omdb
var keys = require('./keys.js'); //links to the keys.js file
var request = require('request'); // Take in the command line arguments
var fs = require('fs'); // Load the fs package to read and write
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];

// var request = require("request");
var queryString = `"${process.argv[3]}"`;

// Just a line
var line = "--------------------------------------------------------------------------";
// Store all of the arguments in an array
// var nodeArgs = process.argv;

// // The LIRI command will always be the second command line argument
// var liriDoIt = nodeArgs[2];


// // The parameter to the LIRI command may contain spaces
// var liriArgument = '';
// for (var i = 3; i < nodeArgs.length; i++) {
// 	liriArgument += nodeArgs[i] + ' ';
// }
// access the spotify and twitter keys
 

  
  // Make twitter work
  // var Twitter = require('twitter');
 
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });

function twitterWorks() {

	// var client = new Twitter(keys.twitter);

	// We will write to the existing log file
 // 	fs.writeFile("log.txt", "utf8", function(err) {
	//     if (err) {
	//       return console.log(err);
	//     }
	// });

	var params = {screen_name: 'eyehaveyes', count: 20};

	// Get them tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
		    // console.log(tweets);
		  for (var i = 0; i < tweets.length; i++) {
               console.log("#" + (i + 1) + ":  " + tweets[i].text);
               console.log("Created:  " + tweets[i].created_at);
               console.log(line);
           }
       }
   });

}
// // Make spotify work
// // var Spotify = require('node-spotify-api');
 
// // var spotify = new Spotify({
// //   id: <your spotify client id>,
// //   secret: <your spotify client secret>
// // });

function spotifyWorks() {

 	// var spotifyKeys = new Spotify(keys.spotify);

  	// We will write to the existing log file
  	// fs.writeFile("log.txt", "utf8", function(err) {
   //  if (err) {
   //    return console.log(err);
   //  }

    	//spotify-this-song '<song name here>'

    // THIS IS NOT WORKING!!!!	
	// spotify.search({ type: 'track', query: 'search' }, function(err, data) {
	//   if (err) {
	//     return console.log('Error occurred: ' + err);
	//   	}
	//   	console.log(data); 
	// });

   	spotify.search({ type: 'track', query: queryString, limit: 3 }, function (err, data) {
       if (err) {
           console.log('Error occurred: ' + err);
       } else {
           for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
               if (i === 0) {
                   console.log("*Artist(s):   " + data.tracks.items[0].artists[i].name);
                   console.log(line);
               } else {
                   console.log("              " + data.tracks.items[0].artists[i].name);
                   console.log(line);
               }
           }
           console.log("*Song:         " + data.tracks.items[0].name);
           console.log(line);
           console.log("*Preview Link: " + data.tracks.items[0].preview_url);
           console.log(line);
           console.log("*Album:        " + data.tracks.items[0].album.name);
           console.log(line);

	       }
	    });
	}
    // no song, default to Ace of Base
 //    var search;
 //    // if (search === "") {
	// if (songTitle === "") {
 //    	search = "The Sign by Ace of Base";
 //    }
 //    else {
 //    	search = songTitle;
 //    }

    // Break down all the numbers inside
    // data = data.split(", ");
    // var result = 0;

    // // Loop through those numbers and add them together to get a sum.
    // for (var i = 0; i < data.length; i++) {
    //   if (parseFloat(data[i])) {
    //     result += parseFloat(data[i]);
    //   }
    // }

    // We will then print the final balance rounded to two decimal places.
    // console.log("You have a total of " + result.toFixed(2));




// Make OMDB work
// var omdb = require('omdb');

	var omdbWorks = function (queryString) {
   console.log(process.argv[3]);
   if (process.argv[3] === undefined) {
       process.argv[3] = "mr nobody";
   } request("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
       if (!error && response.statusCode === 200) {
           console.log("* Title of the movie:         " + JSON.parse(body).Title);
           console.log(line);
           console.log("* Year the movie came out:    " + JSON.parse(body).Year);
           console.log(line);
           console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
           console.log(line);
           for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
               if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
                   console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value);
                   console.log(line);
                   if (JSON.parse(body).Ratings[i].Website !== undefined) {
                       console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website);
                       console.log(line);
                   }
               }
           }
           console.log("* Country/Countries produced:           " + JSON.parse(body).Country);
           console.log(line);
           console.log("* Language of the movie:      " + JSON.parse(body).Language);
           console.log(line);
           console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
           console.log(line);
           console.log("* Actors in the movie:        " + JSON.parse(body).Actors);
           console.log(line);
           fs.appendFileSync('log.txt', "Title: " + JSON.parse(body).Title + "\n");
           fs.appendFileSync('log.txt', "Release Year: " + JSON.parse(body).Year + "\n");
           fs.appendFileSync('log.txt', "IMdB Rating: " + JSON.parse(body).imdbRating + "\n");
           fs.appendFileSync('log.txt', "Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\n");
           fs.appendFileSync('log.txt', "Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL + "\n");
           fs.appendFileSync('log.txt', "Country: " + JSON.parse(body).Country + "\n");
           fs.appendFileSync('log.txt', "Language: " + JSON.parse(body).Language + "\n");
           fs.appendFileSync('log.txt', "Plot: " + JSON.parse(body).Plot + "\n");
           fs.appendFileSync('log.txt', "Actors: " + JSON.parse(body).Actors + "\n");
       }

   });
}
// Create an empty variable for holding the movie name

// We will write to the existing log file
//   	fs.appendFile("log.txt", "utf8", function(err) {
//     	if (err) {
//       		return console.log(err);
//     	}
// 	});

// // var movieName = "";

// // no movie, default to 'Mr. Nobody'
// 	var search;

// 	if (movieTitle === '') {
// 		search = "Mr. Nobody";
// 	}
// 	 else {
// 		search = movieTitle;
// 	}

// 	// Replace spaces with '+' for the query string
// 	search = search.split(' ').join('+');

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// // for (var i = 2; i < nodeArgs.length; i++) {

// //   if (i > 2 && i < nodeArgs.length) {

// //     movieName = movieName + "+" + nodeArgs[i];

// //   }

// //   else {

// //     movieName += nodeArgs[i];

// //   }
// // }



// // Then run a request to the OMDB API with the movie specified
// 	var queryUrl = "http://www.omdbapi.com/?t=" + search + "&plot=full&tomatoes=true";

// 	// This line is just to help us debug against the actual URL.
// 	console.log(queryUrl);

// 	// Send the request to omdb
// 	request(queryUrl, function(error, response, body) {

// 		// If the request is not successful
// 		if ( error || (response.statusCode !== 200) ) {
// 			var errorMessage = 'THis iS nOt WOrKinG: This OMDB entry stinks --> ' + error;

// 			// Append the error string to the log file
// 			fs.appendFile('log.txt', errorMessage, (err) => {
// 				if (err) throw err;
// 				console.log(errorMessage);
// 			});
// 			return;
// 		}
// 	});
 
// }
// omdb.search('saw', function(err, movies) {
//     if(err) {
//         return console.error(err);
//     }
 
//     if(movies.length < 1) {
//         return console.log('No movies were found!');
//     }
 
//     movies.forEach(function(movie) {
//         console.log('%s (%d)', movie.title, movie.year);
//     });
 
// });
 
// omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
//     if(err) {
//         return console.error(err);
//     }
 
//     if(!movie) {
//         return console.log('Movie not found!');
//     }
 
//     console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
//     console.log(movie.plot);

// });


function doSomething() {
   fs.readFile('random.txt', "utf8", function (error, data) {
       var st = data.split(',');

       spotifyWorks(st[1]);
   });
}

switch (command) {
   case "my-tweets":
       twitterWorks();
       break;
   case "spotify-this-song":
       spotifyWorks();
       break;
   case "movie-this":
       omdbWorks();
       break;
   case "do-what-it-says":
       doSomething();
       break;
   default:
       console.log(" Commands to use: my-tweets, spotify-this-song, movie-this, do-what-it-says");
       break;


}
// Make it so liri.js can take in one of the following commands:
// `my-tweets`
// `spotify-this-song`
// `movie-this`
// `do-what-it-says`

// Each command:
// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.

// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.

// node liri.js movie-this '<movie name here>'
//    * Title of the movie, Year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, Country where the movie was produced, Language of the movie, Plot of the movie, Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!

// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
//Make sure you append each command you run to the log.txt file. 
// Do not overwrite your file each time you run a command.