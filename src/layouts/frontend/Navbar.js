import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaHome, FaAddressCard } from 'react-icons/fa';

const styles = {
    navLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        transition: 'background-color 0.3s, color 0.3s',
    },
    navLinkHover: {
        backgroundColor: '#0056b3',
        color: '#fff',
    },
    icon: {
        marginRight: '5px',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        transition: 'background-color 0.3s, color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#dc3545',
        color: '#fff',
    }
};

export default function Navbar() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth_token'));

    useEffect(() => {
        const auth_token = localStorage.getItem('auth_token');

        if (auth_token) {
            axios.interceptors.request.use(
                config => {
                    config.headers.Authorization = `Bearer ${auth_token}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );

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
        }
    }, []);

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_username');
                swal('Success', res.data.message, "success");
                setIsAuthenticated(false);
                navigate('/login');
            }
        });
    };

    let AuthButton;
    if (!isAuthenticated) {
        AuthButton = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to="/register"
                        style={styles.navLink}
                        onMouseEnter={(e) => e.currentTarget.style = styles.navLinkHover}
                        onMouseLeave={(e) => e.currentTarget.style = styles.navLink}
                    >
                        <FaUserPlus style={styles.icon} /> Inscription
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to="/login"
                        style={styles.navLink}
                        onMouseEnter={(e) => e.currentTarget.style = styles.navLinkHover}
                        onMouseLeave={(e) => e.currentTarget.style = styles.navLink}
                    >
                        <FaSignInAlt style={styles.icon} /> Connexion
                    </Link>
                </li>
            </ul>
        );
    } else {
        AuthButton = (
            <li className="nav-item d-flex">
                <Link
                    className='nav-link btn btn-primary text-white me-2'
                    to="/user-cartes"
                    style={styles.button}
                    onMouseEnter={(e) => e.currentTarget.style = styles.navLinkHover}
                    onMouseLeave={(e) => e.currentTarget.style = styles.navLink}
                >
                    <FaAddressCard style={styles.icon} /> Mes Cartes
                </Link>
                <Link
                    className='nav-link btn btn-primary text-white me-2'
                    to="/carte"
                    style={styles.button}
                    onMouseEnter={(e) => e.currentTarget.style = styles.navLinkHover}
                    onMouseLeave={(e) => e.currentTarget.style = styles.navLink}
                >
                    <FaAddressCard style={styles.icon} /> Nouvelle Carte
                </Link>
                <button
                    type='button'
                    onClick={logoutSubmit}
                    className='nav-link btn btn-danger btn-sm text-white'
                    style={styles.button}
                    onMouseEnter={(e) => e.currentTarget.style = styles.buttonHover}
                    onMouseLeave={(e) => e.currentTarget.style = styles.button}
                >
                    <FaSignOutAlt style={styles.icon} /> Déconnexion
                </button>
            </li>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/" style={styles.navLink}>
                    <FaHome style={styles.icon} /> Accueil
                </Link>
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
