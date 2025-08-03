import React from 'react'
import MovieCard from '../components/MovieCard'
import {useState, useEffect} from 'react'
import {searchMovies, getPopularMovies} from '../services/api'
import '../css/Home.css'

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedPages, setLoadedPages] = useState(new Set([1]));

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await getPopularMovies(1);
                setMovies(result.movies);
                setAllMovies(result.movies);
                setCurrentPage(result.currentPage);
                setTotalPages(result.totalPages);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Failed to load movies');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) {
            // If search is empty, show all movies
            setMovies(allMovies);
            setIsSearching(false);
            setCurrentPage(1);
            setLoadedPages(new Set([1]));
            return;
        }
        
        try {
            setLoading(true);
            setIsSearching(true);
            setCurrentPage(1);
            setLoadedPages(new Set([1]));
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
        } catch (error) {
            console.error('Search error:', error);
            setError('Failed to search movies');
        } finally {
            setLoading(false);
        }
    };

    const loadMoreMovies = async () => {
        if (isSearching || loadingMore || currentPage >= totalPages) return;
        
        const nextPage = currentPage + 1;
        
        // Check if we've already loaded this page
        if (loadedPages.has(nextPage)) {
            console.log(`Page ${nextPage} already loaded, skipping...`);
            return;
        }
        
        try {
            setLoadingMore(true);
            console.log(`Loading page ${nextPage}...`);
            const result = await getPopularMovies(nextPage);
            
            // Check if we already have movies from this page to prevent duplicates
            const existingIds = new Set(movies.map(movie => movie.id));
            const newMovies = result.movies.filter(movie => !existingIds.has(movie.id));
            
            if (newMovies.length > 0) {
                setMovies(prevMovies => [...prevMovies, ...newMovies]);
                setAllMovies(prevMovies => [...prevMovies, ...newMovies]);
                setCurrentPage(result.currentPage);
                setTotalPages(result.totalPages);
                setLoadedPages(prev => new Set([...prev, nextPage]));
                console.log(`Added ${newMovies.length} new movies from page ${nextPage}`);
            } else {
                console.log(`No new movies found on page ${nextPage}`);
                setLoadedPages(prev => new Set([...prev, nextPage]));
            }
        } catch (error) {
            console.error('Error loading more movies:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Infinite scroll effect
    useEffect(() => {
        let isScrolling = false;
        
        const handleScroll = () => {
            if (isSearching || loadingMore || isScrolling) return; // Don't load more during search or if already processing
            
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Load more when user is near the bottom (within 200px)
            if (scrollTop + windowHeight >= documentHeight - 200) {
                isScrolling = true;
                loadMoreMovies().finally(() => {
                    isScrolling = false;
                });
            }
        };

        // Throttle scroll events to prevent too many calls
        const throttledHandleScroll = () => {
            if (!isScrolling) {
                requestAnimationFrame(handleScroll);
            }
        };

        window.addEventListener('scroll', throttledHandleScroll);
        return () => window.removeEventListener('scroll', throttledHandleScroll);
    }, [currentPage, totalPages, isSearching, loadingMore]);

    if (loading) {
        return <div className="loading">Loading movies...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    // Use movies directly since we're handling search through API
    const displayMovies = movies;
    


    return (
          <div className="home">
              <form onSubmit={handleSearch} className="search-form">
                <input type="text"
                       placeholder="Search for a movie..."
                       value={searchQuery} className="search-input"
                       onChange={(event) => setSearchQuery(event.target.value)}/>
                <button type="submit" className="search-button">Search</button>
                {isSearching && (
                  <button 
                    type="button" 
                    className="clear-button"
                    onClick={() => {
                      setSearchQuery('');
                      setMovies(allMovies);
                      setIsSearching(false);
                    }}
                  >
                    Clear
                  </button>
                )}
              </form>

              <div className="movie-list">
                  {displayMovies.length > 0 ? (
                      displayMovies.map(movie => (
                          <MovieCard movie={movie} key={movie.id} />
                      ))
                  ) : (
                      <div className="no-movies">No movies found</div>
                  )}
                  
                  {loadingMore && (
                      <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '30px',
                        fontSize: '18px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }}>
                        Loading more movies...
                      </div>
                  )}
                  
                  {!isSearching && !loadingMore && currentPage < totalPages && (
                      <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '20px',
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }}>
                        Scroll down to load more movies
                      </div>
                  )}
              </div>
          </div>
    )
}

export default Home