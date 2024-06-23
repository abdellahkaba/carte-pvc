import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";
import Home from "./components/frontend/Home";
import axios from "axios";
import AdminPrivateRoute from "./AdminPriveRoute";

import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";


axios.defaults.baseURL = "http://127.0.0.1:9000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

// Fetch CSRF token and set it as a default header
axios.get('/sanctum/csrf-cookie').then(response => {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    if (tokenElement) {
        const token = tokenElement.getAttribute('content');
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }
});

function App() {
  const isAuthenticated = !!localStorage.getItem('auth_token');

  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Home />} />
                  <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Login />} />
                  <Route path="/register" element={isAuthenticated ? <Navigate to="/admin/dashboard" /> : <Register />} />
                  <Route path="/admin/*" element={<AdminPrivateRoute />}>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="profile" element={<Profile />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;