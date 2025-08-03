import React from 'react'
import '../css/MovieCard.css'
import {useMovieContext} from '../context/MovieContext'

function MovieCard({ movie }) {

    const {favouriteMovies, addFavouriteMovie, removeFavouriteMovie, isFavouriteMovie} = useMovieContext()

    function onFavouriteClick(event) {
        event.preventDefault();
        console.log('Favorite movie clicked', movie);
        const isFavourite = isFavouriteMovie(movie.id);
        if (isFavourite) {
            removeFavouriteMovie(movie.id)
        } else {
            addFavouriteMovie(movie)
        }
    }

    return (
          <div className="movie-card">
              <div className="movie-poster">
                  {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} />
                  ) : (
                    <div className="no-poster">No Poster Available</div>
                  )}
                  <div className="movie-overview">
                      <button className={`heart-button ${isFavouriteMovie(movie.id) ? 'active' : ''}`} onClick={onFavouriteClick}>
                          {isFavouriteMovie(movie.id) ? "❤️" : "🖤"}
                      </button>
                  </div>
                  <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <p className="movie-year">{movie.year}</p>
                      {movie.genre && <p className="movie-genre">{movie.genre}</p>}
                      {movie.rating && <p className="movie-rating">⭐ {movie.rating}</p>}
                  </div>
              </div>
          </div>
    )
}

export default MovieCard