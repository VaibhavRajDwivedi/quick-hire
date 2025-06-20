import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { div } from "framer-motion/client";
import { setTokenWithExpiry } from "../utils/set-token";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(`handle login called base url ${API_BASE}/login`)
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const token = await res.text();
      setTokenWithExpiry(token, 86400000); 
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-tr from-black via-green-800 to-yellow-100">
      <div className="bg-black/40 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[90%] max-w-md text-center text-white transition-all duration-500">
        <h2 className="text-3xl font-bold text-green-400 mb-6 tracking-wide">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-black/30 text-white placeholder-gray-400 border border-green-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-black/30 text-white placeholder-gray-400 border border-green-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-300">
            <Link to="#" className="hover:underline hover:text-green-300 transition">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-full font-semibold shadow-lg hover:-translate-y-[2px] transition-all duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-green-400 hover:text-lime-300 underline transition">
            Sign up
          </Link>
        </p>

        <p className="text-sm mt-6 text-green-300">CodeCollab &copy; 2024</p>
      </div>
    </div>
  );
}

export default Login;
