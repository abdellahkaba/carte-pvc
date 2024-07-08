import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function Login() {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password
        };

        try {
            await axios.get('/sanctum/csrf-cookie'); 
            const res = await axios.post(`/api/login`, data);
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_username', res.data.username);
                swal('Success', res.data.message, 'success');
                navigate('/');
            } else if (res.data.status === 401) {
                swal('Error', res.data.message, 'error');
            } else {
                setLogin({ ...loginInput, error_list: res.data.validation_errors });
            }
        } catch (error) {
            swal('Error', 'Something went wrong. Please try again.', 'error');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Connexion</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={loginSubmit}>
                                    <div className='form-group mb-3'>
                                        <label><strong>Adresse Email</strong></label>
                                        <div className="input-group">
                                            <input type="email" name="email" className="form-control" value={loginInput.email} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text"><FaEnvelope /></span>
                                            </div>
                                        </div>
                                        <span>{loginInput.error_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label><strong>Mot de passe</strong></label>
                                        <div className="input-group">
                                            <input type="password" name="password" className="form-control" value={loginInput.password} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text"><FaLock /></span>
                                            </div>
                                        </div>
                                        <span>{loginInput.error_list.password}</span>
                                    </div>
                                    <div className='form-group mb-3 d-flex justify-content-between align-items-center'>
                                        <button type='submit' className='btn btn-primary'>Connexion</button>
                                        <Link to="/forgot-password" className='btn btn-link'>Mot de passe oublié ?</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
