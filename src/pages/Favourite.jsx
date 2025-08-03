import React from 'react';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../context/MovieContext';
import '../css/Favourite.css';

function Favourite() {
    const { favouriteMovies } = useMovieContext();

    return (
        <div className="favourites">
            <h2>My Favourite Movies</h2>
            
            {favouriteMovies.length > 0 ? (
                <div className="movies-grid">
                    {favouriteMovies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            ) : (
                <div className="favourites-empty">
                    <h2>No Favorite Movies Yet</h2>
                    <p>Start adding your favorite movies from the home page!</p>
                </div>
            )}
        </div>
    );
}

export default Favourite;