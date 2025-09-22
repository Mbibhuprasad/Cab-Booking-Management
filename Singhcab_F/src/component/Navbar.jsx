import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/b8a09045-7604-44aa-b27a-eb4703716f9a.png";
import Login from "./Login";
import Register from "./Register";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // ✅ for mobile toggle

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(loggedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <nav className="flex justify-between items-center py-2 px-6 md:px-12 bg-black text-white relative">
        {/* Logo */}
        <img src={logo} alt="logo" className="h-[4rem] md:h-[6rem] w-auto" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 lg:gap-14">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/vehicles" className="hover:text-yellow-400 transition">
              Vehicles
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-400 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 transition">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-yellow-400 font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded"
            >
              Login
            </button>
          )}

          <a
            href="tel:+919876846464"
            className="text-yellow-400 font-semibold text-[1.1rem] lg:text-[1.4rem]"
          >
            +91-8971686464
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-yellow-400"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center gap-6 py-6 md:hidden z-50">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              Home
            </Link>
            <Link
              to="/vehicles"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              Vehicles
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              Contact Us
            </Link>

            {user ? (
              <div className="flex flex-col items-center gap-4">
                <span className="text-yellow-400 font-semibold">
                  {user.name}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setIsOpen(false);
                }}
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded"
              >
                Login
              </button>
            )}

            <a
              href="tel:+919876846464"
              className="text-yellow-400 font-semibold text-lg"
              onClick={() => setIsOpen(false)}
            >
              +91-8971686464
            </a>
          </div>
        )}
      </nav>

      {/* Modals */}
      {showLogin && (
        <Login
          close={() => setShowLogin(false)}
          openRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          setUser={setUser}
        />
      )}

      {showRegister && (
        <Register
          close={() => setShowRegister(false)}
          openLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
