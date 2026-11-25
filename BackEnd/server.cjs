const express = require('express');
const app = express()
const port = 4000
const cors = require('cors');



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.pagjggn.mongodb.net/MoviesDB');

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    poster: String
});

const MovieModel = mongoose.model('myMovies2', movieSchema);
app.delete('/api/movie/:id', async (req, res) => {
  
        console.log('Deleting movie with ID:', req.params.id);
        const movie = await MovieModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Movie deleted successfully", movie });
        
    });
    
app.post('/api/movies', async (req, res) => {
 console.log(req.body);
    const { title, year, poster } = req.body;

    const newMovie = new MovieModel({ title, year, poster });
    await newMovie.save();

    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
})

app.get('/api/movie/:id', async (req, res) => {
  const movie = await MovieModel.findById(req.params.id);
  res.send(movie);
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/movies', async (req, res) => {
  const movies = await MovieModel.find({});
  res.json(movies);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})