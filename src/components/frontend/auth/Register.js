import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInput = (e) => {
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const registerSubmit = async (e) => {
        e.preventDefault();

        if (registerInput.password !== registerInput.password_confirmation) {
            setRegister({
                ...registerInput,
                error_list: { password_confirmation: 'Les mots de passe ne correspondent pas.' },
            });
            return;
        }

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        };

        try {
            await axios.get('/sanctum/csrf-cookie'); 
            const res = await axios.post(`/api/register`, data);
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_username', res.data.username);
                swal('Success', res.data.message, 'success');
                navigate('/');
            } else {
                setRegister({ ...registerInput, error_list: res.data.validation_errors });
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
                                <h4>Inscription</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={registerSubmit}>
                                    <div className='form-group mb-3'>
                                        <label><strong>Nom complet</strong></label>
                                        <div className="input-group">
                                            <input type="text" name="name" className="form-control" value={registerInput.name} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text"><FaUser /></span>
                                            </div>
                                        </div>
                                        <span className="text-danger">{registerInput.error_list.name}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label><strong>Adresse Email</strong></label>
                                        <div className="input-group">
                                            <input type="email" name="email" className="form-control" value={registerInput.email} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text"><FaEnvelope /></span>
                                            </div>
                                        </div>
                                        <span className="text-danger">{registerInput.error_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label><strong>Mot de passe</strong></label>
                                        <div className="input-group">
                                            <input type={showPassword ? "text" : "password"} name="password" className="form-control" value={registerInput.password} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                                <span className="input-group-text"><FaLock /></span>
                                            </div>
                                        </div>
                                        <span className="text-danger">{registerInput.error_list.password}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label><strong>Confirmer le mot de passe</strong></label>
                                        <div className="input-group">
                                            <input type={showConfirmPassword ? "text" : "password"} name="password_confirmation" className="form-control" value={registerInput.password_confirmation} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text" onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                                <span className="input-group-text"><FaLock /></span>
                                            </div>
                                        </div>
                                        <span className="text-danger">{registerInput.error_list.password_confirmation}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Enregistrer</button>
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
