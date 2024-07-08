import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

export default function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [passwordInput, setPassword] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleInput = (e) => {
        setPassword({ ...passwordInput, [e.target.name]: e.target.value });
    };

    const resetPasswordSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: passwordInput.email,
            password: passwordInput.password,
            password_confirmation: passwordInput.password_confirmation,
            token
        };

        try {
            const res = await axios.post(`/api/reset-password`, data);
            if (res.data.status === 'passwords.reset') {
                swal('Success', 'Le mot de passe a été réinitialisé avec succès', 'success');
                navigate('/login');
            } else {
                swal('Error', 'Désolé il y\'a un problème.', 'error');
            }
        } catch (error) {
            swal('Error', 'Désolé il y\'a un problème.', 'error');
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
                                <h4>Reset Password</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={resetPasswordSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Email Address</label>
                                        <input type="email" name="email" className="form-control" value={passwordInput.email} onChange={handleInput} />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>New Password</label>
                                        <div className="input-group">
                                            <input type="password" name="password" className="form-control" value={passwordInput.password} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text"><FaLock /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Confirm New Password</label>
                                        <div className="input-group">
                                            <input type="password" name="password_confirmation" className="form-control" value={passwordInput.password_confirmation} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text"><FaLock /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Reset Password</button>
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
