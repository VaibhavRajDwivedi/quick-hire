import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ContactUs from "./pages/ContactUs"
import HireFreelancer from "./pages/HireFreelancer"
import { useState } from "react"
import Profile from "./pages/Profile"
import { getTokenWithExpiry } from './utils/set-token';
import './index.css';

function App() {
  
  const token = getTokenWithExpiry();
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!token)

  
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/hire-freelancers" element={<PrivateRoute><HireFreelancer /></PrivateRoute>} />
        <Route path="/about-us" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/contact-us" element={<PrivateRoute><ContactUs /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
