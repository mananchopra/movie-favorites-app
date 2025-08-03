import React from 'react'
import {createContext, useState, useContext, useEffect} from 'react'

const MovieContext = createContext()

export const useMovieContext = () => {
    return useContext(MovieContext)
}

export const MovieProvider = ({children}) => {
    // Initialize state with localStorage data to prevent race condition
    const getInitialFavourites = () => {
        try {
            const storedMovies = localStorage.getItem('favouriteMovies')
            return storedMovies ? JSON.parse(storedMovies) : []
        } catch (error) {
            console.error('Error parsing stored movies:', error)
            return []
        }
    }

    const [favouriteMovies, setFavouriteMovies] = useState(getInitialFavourites)
    
    // Debug log on initialization
    useEffect(() => {
        console.log('MovieContext initialized with', favouriteMovies.length, 'favorite movies')
    }, [])

    useEffect(() => {
        console.log('Saving favorites to localStorage:', favouriteMovies.length, 'movies')
        localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies))
    }, [favouriteMovies])

    const addFavouriteMovie = (movie) => {
        console.log('Adding movie to favorites:', movie.title)
        setFavouriteMovies(prev => {
            const newFavourites = [...prev, movie]
            console.log('Updated favorites count:', newFavourites.length)
            return newFavourites
        })
    }

    const removeFavouriteMovie = (movieId) => {
        console.log('Removing movie from favorites, ID:', movieId)
        setFavouriteMovies(prev => {
            const newFavourites = prev.filter((movie) => movie.id !== movieId)
            console.log('Updated favorites count:', newFavourites.length)
            return newFavourites
        })
    }

    const isFavouriteMovie = (movieId) => {
        return favouriteMovies.some((movie) => movie.id === movieId)
    }

    const value = {
        favouriteMovies,
        addFavouriteMovie,
        removeFavouriteMovie,
        isFavouriteMovie,
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}