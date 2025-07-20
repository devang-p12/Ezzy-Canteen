import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser, isAdmin } = useAuth();

  const logoutClick = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white shadow-lg px-8 py-10 flex items-center justify-between font-poppins">
      {/* Logo */}
      <div>
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide hover:scale-105 transform transition duration-200"
        >
          Ezzy Canteen
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-lg font-medium">
        {user ? (
          <>
            <Link
              to="/"
              className="hover:text-gray-300 transition duration-150"
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="hover:text-gray-300 transition duration-150"
            >
              Menu
            </Link>
            <Link
              to="/order"
              className="hover:text-gray-300 transition duration-150"
            >
              Order
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="hover:text-gray-300 transition duration-150"
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={logoutClick}
              className="ml-4 bg-white text-green-800 font-semibold px-4 py-2 rounded-xl hover:bg-gray-100 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-green-800 font-semibold px-4 py-2 rounded-xl hover:bg-gray-100 transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
