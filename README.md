# Movie Favorites App

A modern React application for browsing movies and managing your favorite movie collection.

## Features

- **Movie Discovery**: Browse trending movies from TMDB API
- **Search Functionality**: Search for specific movies across the database
- **Favorite Management**: Add/remove movies to your favorites collection
- **Infinite Scroll**: Automatically load more movies as you scroll
- **Persistent Storage**: Your favorites are saved locally and persist across sessions
- **Modern UI**: Beautiful gradient design with glass morphism effects

## Technologies Used

- **React 19**: Latest React with hooks and functional components
- **React Router**: Client-side routing between pages
- **Vite**: Fast build tool and development server
- **TMDB API**: Movie database for trending and search functionality
- **CSS3**: Modern styling with gradients, animations, and responsive design

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**: Navigate to `http://localhost:5174`

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── MovieCard.jsx
│   └── NavBar.jsx
├── context/       # React Context for state management
│   └── MovieContext.jsx
├── pages/         # Page components
│   ├── Home.jsx
│   └── Favourite.jsx
├── services/      # API services
│   └── api.js
└── css/          # Stylesheets
    ├── Home.css
    ├── MovieCard.css
    ├── NavBar.css
    └── Favourite.css
```

## Key Features

### Home Page
- Display trending movies in a responsive grid
- Search functionality with real-time results
- Infinite scroll pagination
- Heart button to add/remove favorites

### Favorites Page
- View all your saved favorite movies
- Remove movies from favorites
- Persistent storage across browser sessions

### Navigation
- Sticky navigation bar with gradient design
- Smooth transitions between pages
- Responsive design for all screen sizes

## API Integration

The app uses The Movie Database (TMDB) API for:
- Fetching trending movies
- Searching movies by title
- Getting movie details and posters

## Local Storage

Favorites are automatically saved to localStorage and persist across:
- Page refreshes
- Browser sessions
- App restarts

## Development

- **Hot Module Replacement**: Instant updates during development
- **ESLint**: Code quality and consistency
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern CSS**: Gradients, animations, and glass morphism effects
