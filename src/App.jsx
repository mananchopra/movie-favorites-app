import './App.css'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import {MovieProvider} from './context/MovieContext.jsx';

function App() {
    return (
          <MovieProvider>
              <NavBar />
              <main className="main-content">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/favourite" element={<Favourite />} />
                  </Routes>
              </main>
          </MovieProvider>
    )
}

export default App
