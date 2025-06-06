import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '@/components/login'
import Register from '@/components/register'
import UrlShortener from './components/urlShortner'


function App() {

  return (
    <>
   <Router>
      <Routes>
         <Route path="/" element={<UrlShortener />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
      </Routes>
    </Router>
    </>
  )
}

export default App
