import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError(""); // reset error
      await register(name, email, password);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message); // show backend error
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 animate-gradient-x px-4">
      {/* Glassmorphism Card with Purple Glow */}
      <div className="w-full max-w-md bg-indigo-900/30 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-3xl p-8 transform transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]">
        
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-cyan-300 drop-shadow-lg mb-4">
          Create an Account 🚀
        </h2>
        <p className="text-center text-cyan-100/80 mb-8">
          Join us today and start your journey
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-200 bg-red-600/30 border border-red-400/30 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-cyan-100 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-cyan-100 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-cyan-100 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-bold rounded-full shadow-md hover:shadow-cyan-400/50 hover:scale-105 transition-all"
          >
            Create Account
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-white/20"></div>
          <span className="px-3 text-white/70 text-sm">or</span>
          <div className="flex-grow h-px bg-white/20"></div>
        </div>

        {/* Footer */}
        <p className="text-sm text-cyan-100/80 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300 font-semibold hover:underline hover:text-cyan-200 transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
