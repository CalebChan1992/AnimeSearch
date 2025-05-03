import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AnimeDetail from './pages/AnimeDetail'
import Header from './components/Header'
import './App.css'

function App() {
  return (
    <Router>
      <Header title="Anime Search App" />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
