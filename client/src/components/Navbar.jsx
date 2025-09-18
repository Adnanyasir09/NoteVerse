import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  Home,
} from "lucide-react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-50 transition-all">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <Home className="h-7 w-7 text-cyan-300 group-hover:scale-110 transition-transform" />
            <span className="ml-2 font-extrabold text-2xl text-cyan-300 drop-shadow-md group-hover:text-cyan-100 transition-colors">
              NoteVerse
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-cyan-100 hover:text-cyan-300 font-medium transition-all hover:scale-105"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-cyan-400/50 hover:scale-105 transition-all"
                >
                  <UserPlus size={18} />
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-cyan-100 hover:text-cyan-300 font-medium transition-all hover:scale-105"
                  >
                    <LayoutDashboard size={18} />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-pink-400/50 hover:scale-105 transition-all"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-cyan-300 hover:text-cyan-100 hover:bg-white/10 transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-900/30 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-4 py-3 space-y-3 transition-all">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2 text-cyan-100 hover:text-cyan-300 font-medium transition"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-cyan-400/50 hover:scale-105 transition-all"
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </>
          ) : (
            <>
              {user.isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 text-cyan-100 hover:text-cyan-300 font-medium transition"
                >
                  <LayoutDashboard size={18} />
                  <span>Admin Panel</span>
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-pink-400/50 hover:scale-105 transition-all"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
