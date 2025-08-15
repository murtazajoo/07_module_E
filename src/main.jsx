import { createRoot } from 'react-dom/client'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<>
          <h1>Welcome to the Photo Slideshow App</h1>
          <p>Select a theme and mode to get started.</p>
          <NavLink to="/07_module_e">Go to Slideshow</NavLink>
        </>} />
      <Route path="/07_module_e" element={<App />} />
    </Routes>
    </BrowserRouter>
)
