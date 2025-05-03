import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box, GlobalStyles } from '@mui/material'
import Home from './pages/Home'
import AnimeDetail from './pages/AnimeDetail'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import theme from './theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '.MuiAppBar-root': {
            borderRadius: 0,
          }
        }}
      />
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: '#f5f5f5'
          }}>
            <Header title="Anime Search App" />
            <Box sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/anime/:id" element={<AnimeDetail />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
