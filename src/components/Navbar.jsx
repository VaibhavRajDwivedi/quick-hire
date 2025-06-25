"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { getTokenWithExpiry } from "../utils/set-token";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const checkLogin = () => {
      const token = getTokenWithExpiry();
      setIsLoggedIn(!!token);
    };

    checkLogin();
    window.addEventListener("authChange", checkLogin);

    return () => window.removeEventListener("authChange", checkLogin);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "shadow-md bg-black" : "bg-black"
        }`}
    >
      <nav className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <img
              src={logo || "/placeholder.svg"}
              alt="QuickHire Logo"
              className="h-12 max-h-14"
            />
            <h3 className="text-yellowgreen text-lg font-semibold hidden sm:block">
              QuickHire
            </h3>
          </Link>

          {/* Links */}
          <ul className="hidden lg:flex ml-8 space-x-6 text-white text-base font-medium divide-x divide-green-500">
            <li className="pr-6">
              <Link to="/hire-freelancers" className="hover:text-yellowgreen">
                Hire Freelancers
              </Link>
            </li>
            <li className="pr-6">
              <Link to="/about-us" className="hover:text-yellowgreen">
                About Us
              </Link>
            </li>
            <li className="pr-6">
              <Link to="/contact-us" className="hover:text-yellowgreen">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-yellowgreen">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="lg:hidden hamburger-menu cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
        </div>

        {!isLoggedIn && (
          <div className="hidden sm:flex items-center space-x-2">
            <Link to="/login">
              <button className="h-10 w-24 border-2 border-green-700 text-white rounded-full hover:bg-green-700 transition-all">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="h-10 w-24 bg-green-700 text-white rounded-full hover:shadow-lg transition-all">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              setIsLoggedIn(false);
              window.location.href = "/login";
            }}
            className="hidden sm:flex h-10 w-24 border-2 border-red-600 text-white rounded-full hover:bg-red-600 transition-all items-center justify-center"
          >
            Logout
          </button>
        )}


      </nav>

      <div
        className={`mobile-menu fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden ${isMenuOpen ? "block" : "hidden"
          }`}
      >
        <ul className="space-y-6 text-white text-2xl">
          <li>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellowgreen"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/hire-freelancers"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellowgreen"
            >
              Hire Freelancers
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellowgreen"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellowgreen"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-yellowgreen"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
