import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';


export default function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-tr from-black via-green-800 to-yellow-100">
      <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-3xl p-8 shadow-xl text-center text-white">
        <h2 className="text-3xl font-bold text-green-400 mb-2">QuickHire</h2>
        <p className="text-green-300 mb-6 font-medium">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 bg-black/20 text-white placeholder-gray-300 border border-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <i className="bx bx-user absolute right-5 top-3 text-xl text-green-300" />
          </div>

          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 bg-black/20 text-white placeholder-gray-300 border border-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <i className="bx bx-envelope absolute right-5 top-3 text-xl text-green-300" />
          </div>

          <div className="relative">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 bg-black/20 text-white placeholder-gray-300 border border-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <i className="bx bx-lock-alt absolute right-5 top-3 text-xl text-green-300" />
          </div>

          {error && (
            <p className="text-red-400 text-sm -mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-500 hover:to-green-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:-translate-y-[1px]"
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-300 text-sm mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-green-300 hover:text-yellow-200 underline transition"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
