import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/frontend/auth/Register';
import Login from './components/frontend/auth/Login';
import Home from './components/frontend/Home';
import axios from 'axios';
import Carte from './components/frontend/cartes/Carte';
import UserCartes from './components/frontend/cartes/UserCartes';
import CarteDetail from './components/frontend/cartes/CarteDetail';
import EditCarte from './components/frontend/cartes/EditCarte';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from './components/frontend/auth/ForgotPassword';
import ResetPassword from './components/frontend/auth/ResetPassword';


axios.defaults.baseURL = 'http://127.0.0.1:9000';
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
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/carte" element={<ProtectedRoute><Carte /></ProtectedRoute>} />
                    <Route path="/user-cartes" element={<ProtectedRoute><UserCartes /></ProtectedRoute>} />
                    <Route path="/carte-detail/:id" element={<ProtectedRoute><CarteDetail /></ProtectedRoute>} />
                    <Route path="/edit-carte/:id" element={<ProtectedRoute><EditCarte /></ProtectedRoute>} />
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
