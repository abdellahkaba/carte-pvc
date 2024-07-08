import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function EditCarte() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carteInput, setCarteInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        adress: '',
        phone: '',
        title: '',
        company: '',
        website: '',
        facebook: '',
        linkdin: '',
        whatsapp: ''
    });

    const [pictures, setPictures] = useState({
        photo: '',
        logo: '',
        background_image: '',
    });

    const [errorList, setErrorList] = useState([]);

    useEffect(() => {
        axios.get(`/api/cartes/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    setCarteInput(res.data.carte);
                } else {
                    swal("Erreur", "Erreur de récupération de la carte", "error");
                }
            })
            .catch(err => {
                console.error(err);
                swal("Erreur", "Erreur de récupération de la carte", "error");
            });
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCarteInput((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value, name) => {
        setCarteInput((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoto = (e) => {
        setPictures({ ...pictures, photo: e.target.files[0] });
    };

    const handleLogo = (e) => {
        setPictures({ ...pictures, logo: e.target.files[0] });
    };

    const handleBackgroundImage = (e) => {
        setPictures({ ...pictures, background_image: e.target.files[0] });
    };

    const carteUpdate = (e) => {
        e.preventDefault();
        swal({
            title: "Êtes-vous sûr?",
            text: "Voulez-vous vraiment modifier cette carte?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willUpdate) => {
            if (willUpdate) {
                const formData = new FormData();
                formData.append('photo', pictures.photo);
                formData.append('logo', pictures.logo);
                formData.append('background_image', pictures.background_image);
                formData.append('first_name', carteInput.first_name || '');
                formData.append('last_name', carteInput.last_name || '');
                formData.append('email', carteInput.email || '');
                formData.append('adress', carteInput.adress || '');
                formData.append('phone', carteInput.phone || '');
                formData.append('title', carteInput.title || '');
                formData.append('company', carteInput.company || '');
                formData.append('website', carteInput.website || '');
                formData.append('facebook', carteInput.facebook || '');
                formData.append('linkdin', carteInput.linkdin || '');
                formData.append('whatsapp', carteInput.whatsapp || '');

                axios.post(`/api/cartes/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    }
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        swal("Succès", res.data.message, "success");
                        setErrorList([]);
                        navigate('/user-cartes');
                    } else if (res.data.status === 422) {
                        swal("Erreur de validation", "", "error");
                        setErrorList(res.data.errors);
                    }
                })
                .catch((err) => {
                    console.error('Error:', err);
                    swal("Erreur", "Une erreur est survenue", "error");
                });
            } else {
                swal("La modification a été annulée");
            }
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h4>Modifier la Carte</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={carteUpdate}>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Prénom</strong></label>
                                            <input type="text" name="first_name" className="form-control" value={carteInput.first_name || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Nom</strong></label>
                                            <input type="text" name="last_name" className="form-control" value={carteInput.last_name || ''} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Adresse Email</strong></label>
                                            <input type="email" name="email" className="form-control" value={carteInput.email || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Adresse</strong></label>
                                            <input type="text" name="adress" className="form-control" value={carteInput.adress || ''} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Téléphone</strong></label>
                                            <PhoneInput
                                                country={'fr'}
                                                value={carteInput.phone}
                                                onChange={(value) => handlePhoneChange(value, 'phone')}
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                    autoFocus: true
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Titre</strong></label>
                                            <input type="text" name="title" className="form-control" value={carteInput.title || ''} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Société</strong></label>
                                            <input type="text" name="company" className="form-control" value={carteInput.company || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Site Web</strong></label>
                                            <input type="text" name="website" className="form-control" value={carteInput.website || ''} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Facebook</strong></label>
                                            <input type="url" name="facebook" className="form-control" value={carteInput.facebook || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Linkdin</strong></label>
                                            <input type="url" name="linkdin" className="form-control" value={carteInput.linkdin || ''} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Whatsapp</strong></label>
                                            <PhoneInput
                                                country={'fr'}
                                                value={carteInput.whatsapp}
                                                onChange={(value) => handlePhoneChange(value, 'whatsapp')}
                                                inputProps={{
                                                    name: 'whatsapp',
                                                    required: true,
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Logo</strong></label>
                                            <input type="file" name="logo" className="form-control" onChange={handleLogo} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Photo</strong></label>
                                            <input type="file" name="photo" className="form-control" onChange={handlePhoto} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><strong>Arrière Plan</strong></label>
                                            <input type="file" name="background_image" className="form-control" onChange={handleBackgroundImage} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group mb-3">
                                            <button type="submit" className="btn btn-primary">Modifier</button>
                                        </div>
                                    </div>
                                    {errorList.length > 0 && (
                                        <div className="alert alert-danger">
                                            <ul>
                                                {errorList.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
