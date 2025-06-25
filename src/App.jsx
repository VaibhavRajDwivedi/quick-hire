import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/ContactUs";
import HireFreelancer from "./pages/HireFreelancer";
import { useState, useEffect } from "react";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import { getTokenWithExpiry } from './utils/set-token';
import { getRoleWithExpiry } from './utils/set-role'; 
import './index.css';

function App() {
  const [token, setToken] = useState(getTokenWithExpiry());
  const [role, setRole] = useState(getRoleWithExpiry());

  const isLoggedIn = !!token;
  const isAdmin = role === "ADMIN";

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {!isAdmin && <Navbar />}

      <Routes>
        {isAdmin ? (
          <>
            <Route path="/" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/hire-freelancers" element={<PrivateRoute><HireFreelancer /></PrivateRoute>} />
            <Route path="/about-us" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/contact-us" element={<PrivateRoute><ContactUs /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/login" element={<Login setIsLoggedIn={() => {
              setToken(getTokenWithExpiry());
              setRole(getRoleWithExpiry());
            }} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
