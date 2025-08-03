const API_KEY = "b0a202abdebad6aae38e4a9990f2d590"
const BASE_URL = "https://api.themoviedb.org/3/"

const requests = {
    fetchTrending: `${BASE_URL}trending/all/week?api_key=${API_KEY}&language=en-US&page=1`,
    fetchNetflixOriginals: `${BASE_URL}discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    fetchActionMovies: `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=99`,
}

export const getPopularMovies = async (page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}trending/all/week?api_key=${API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        
        // Transform API data to match our MovieCard component expectations
        const transformedMovies = data.results.map(movie => ({
            id: movie.id,
            title: movie.title || movie.name,
            year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            genre: movie.genre_ids ? movie.genre_ids.join(', ') : 'Unknown',
            rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
        }));
        
        return {
            movies: transformedMovies,
            totalPages: data.total_pages,
            currentPage: data.page
        };
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}`);
        const data = await response.json();
        
        // Transform API data to match our MovieCard component expectations
        const transformedMovies = data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
            genre: movie.genre_ids ? movie.genre_ids.join(', ') : 'Unknown',
            rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
        }));
        
        return transformedMovies;
    } catch (error) {
        console.error('Search API Error:', error);
        throw error;
    }
}