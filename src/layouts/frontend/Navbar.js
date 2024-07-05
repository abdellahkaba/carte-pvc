import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function Navbar() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth_token'));

    useEffect(() => {
        axios.get('/api/checkingAuthenticated')
            .then(res => {
                if (res.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, "success");
                setIsAuthenticated(false);
                navigate('/login');
            }
        });
    }

    let AuthButton;
    if (!isAuthenticated) {
        AuthButton = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Inscription</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Connexion</Link>
                </li>
            </ul>
        );
    } else {
        AuthButton = (
            <li className="nav-item d-flex">
                <Link className='nav-link btn btn-primary text-white me-2' to="/user-cartes">Mes Cartes</Link>
                <Link className='nav-link btn btn-primary text-white me-2' to="/carte">Ajouter une Carte</Link>
                <button type='button' onClick={logoutSubmit} className='nav-link btn btn-danger btn-sm text-white'>Deconnexion</button>
            </li>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Accueil</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {AuthButton}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
