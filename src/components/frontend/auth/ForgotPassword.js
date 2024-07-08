import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleInput = (e) => {
        setEmail(e.target.value);
    };

    const forgotPasswordSubmit = async (e) => {
        e.preventDefault();
        const data = { email };

        try {
            const res = await axios.post(`/api/forgot-password`, data);
            if (res.data.status === 'passwords.sent') {
                swal('Success', 'Lien de réinitialisation du mot de passe envoyé à votre adresse e-mail', 'success');
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
                                <h4>Mot de passe oublié</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={forgotPasswordSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Email Address</label>
                                        <div className="input-group">
                                            <input type="email" name="email" className="form-control" value={email} onChange={handleInput} />
                                            <div className="input-group-append">
                                                <span className="input-group-text"><FaEnvelope /></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Envoyé le lien de réinitialisation du mot de passe</button>
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
