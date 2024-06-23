import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password
        };
        try {
            await axios.get('/sanctum/csrf-cookie'); 
            const res = await axios.post(`/api/register`, data);
            
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_username', res.data.username);
                swal("Success", res.data.message, "success");
                navigate('/');
            } else {
                setRegister({ ...registerInput, error_list: res.data.validation_errors });
            }
        } catch (error) {
            console.error('There was an error!', error);
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
                                        <label>Nom complet</label>
                                        <input type="text" name="name" className="form-control" value={registerInput.name} onChange={handleInput} />
                                        <span>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Adresse Email</label>
                                        <input type="email" name="email" className="form-control" value={registerInput.email} onChange={handleInput} />
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Mot de passe</label>
                                        <input type="password" name="password" className="form-control" value={registerInput.password} onChange={handleInput} />
                                        <span>{registerInput.error_list.password}</span>
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