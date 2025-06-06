import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UrlShortener from './components/urlShortner'
import Login from './components/login'
import Register from './components/register'
import UnprotectedRoute from './protected/public_routes'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<UrlShortener />} />
      
      <Route
        path="/login"
        element={
          <UnprotectedRoute>
            <Login />
          </UnprotectedRoute>
        }
      />

      <Route
        path="/register"
        element={
          <UnprotectedRoute>
            <Register />
          </UnprotectedRoute>
        }
      />
    </Routes>
    </Router>
  )
}

export default App
