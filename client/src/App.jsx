import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar"; // ✅ import Navbar
import axios from "axios";

const Protected = ({ children, adminOnly }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasUser, setHasUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/check-first-user")
      .then((res) => setHasUser(res.data.hasUser))
      .catch(() => setHasUser(true)) // fallback if error
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Navbar /> {/* ✅ Always visible */}
      <div className="">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={hasUser ? "/login" : "/register"} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <Protected adminOnly={true}>
                <AdminPanel />
              </Protected>
            }
          />
        </Routes>
      </div>
    </>
  );
}
