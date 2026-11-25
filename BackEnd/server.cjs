// import express so we can make the server
const express = require('express');
// create the express app
const app = express()
// the port the server will run on
const port = 4000
// import cors (lets the frontend talk to the backend)
const cors = require('cors');



// import body-parser so we can read data sent in requests
const bodyParser = require('body-parser');
// lets us read form data
app.use(bodyParser.urlencoded({ extended: true }));
// lets us read json data
app.use(bodyParser.json());

// this middleware runs on every request
// it adds headers so the react app (on a different port) is allowed to access the api
app.use(function (req, res, next) {
    // allow requests from any website
    res.header("Access-Control-Allow-Origin", "*");
    // the types of requests that are allowed
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // the headers that are allowed
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // move on to the next part
    next();
});



// import mongoose to connect to mongodb
const mongoose = require('mongoose');
// connect to my mongodb atlas database called MoviesDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.pagjggn.mongodb.net/MoviesDB');

// schema = the structure of each movie in the database
const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    poster: String
});

// make a model from the schema, this is what we use to add/find/delete movies
// 'myMovies2' is the name of the collection
const MovieModel = mongoose.model('myMovies2', movieSchema);

// DELETE request to remove a movie using its id from the url
app.delete('/api/movie/:id', async (req, res) => {

        // print the id so i can check which movie is being deleted
        console.log('Deleting movie with ID:', req.params.id);
        // find the movie with that id and delete it from the database
        const movie = await MovieModel.findByIdAndDelete(req.params.id);
        // send back a 200 (ok) status and the movie that was deleted
        res.status(200).send({ message: "Movie deleted successfully", movie });

    });

// POST request to add a new movie to the database
app.post('/api/movies', async (req, res) => {
 // print out what was sent so i can check it
 console.log(req.body);
    // get the title, year and poster from the request body
    const { title, year, poster } = req.body;

    // make a new movie using the model
    const newMovie = new MovieModel({ title, year, poster });
    // save it to the database (await waits until it's done)
    await newMovie.save();

    // send back a 201 (created) status and the new movie
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})

// GET request to find one movie using its id from the url
app.get('/api/movie/:id', async (req, res) => {
  // look for the movie with that id
  const movie = await MovieModel.findById(req.params.id);
  // send the movie back
  res.send(movie);
});


// basic route on the homepage to test the server is working
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// GET request to get all the movies from the database
app.get('/api/movies', async (req, res) => {
  // find({}) with empty brackets gets every movie
  const movies = await MovieModel.find({});
  // send them back as json
  res.json(movies);
});

// start the server and listen on port 4000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
