var express = require('express')// getting the instance of express
var app = express()// instantiating express
var movies = require('./routes/movie/movie_routes.js')//adding routes for movies
var web_shows = require('./routes/web_shows/web_shows_routes.js');//adding routes for web shows
const PrivateIPAddress = require('ip').address();// fetches system's private ip address on which server is running.


//middileware to handle requests from same ip
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //middileware to serve static files
app.use(express.static('assets/client/'))

//using movies router to process all movie related api calls
app.use('/movie',movies)

//using web_shows router to process all web_shows api calls
app.use('/web_shows',web_shows)

app.listen(4321, function () {
    console.clear()
    console.log('=======================================  SERVER 2.0  ===================================\n\n')
    console.log('your local stream server is now running add the movies to "/repo/movies/" directory\n and connect your phone or any other device via wifi \n open url http://'+PrivateIPAddress+':4321 \n enjoy \n made by rajeev chourey\n\n')
    console.log('========================================================================================\n\n')
})