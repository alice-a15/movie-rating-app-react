import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form'; 

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 37f24b843df39714028a7840cc88b495684152a4'
      }
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))
  }, [])

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null)
  }

  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }

  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className='layout'>
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked}/>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
          { editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie}/> : null}
      </div>
    </div>
  );
}

export default App;
