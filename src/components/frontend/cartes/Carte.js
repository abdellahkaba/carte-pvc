import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';

export default function Carte() {
    const [carteInput, setCarte] = useState({
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

    const navigate = useNavigate()

    const [pictures, setPictures] = useState({
        photo: '',
        logo: '',
        background_image: '',
    });

    const [errorList, setErrorList] = useState([]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCarte((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value, name) => {
        setCarte((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoto = (e) => {
        setPictures((prev) => ({ ...prev, photo: e.target.files[0] }));
    };

    const handleLogo = (e) => {
        setPictures((prev) => ({ ...prev, logo: e.target.files[0] }));
    };

    const handleBackgroundImage = (e) => {
        setPictures((prev) => ({ ...prev, background_image: e.target.files[0] }));
    };

    const carteSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', pictures.photo);
        formData.append('logo', pictures.logo);
        formData.append('background_image', pictures.background_image);
        formData.append('first_name', carteInput.first_name);
        formData.append('last_name', carteInput.last_name);
        formData.append('email', carteInput.email);
        formData.append('adress', carteInput.adress);
        formData.append('phone', carteInput.phone);
        formData.append('title', carteInput.title);
        formData.append('company', carteInput.company);
        formData.append('website', carteInput.website);
        formData.append('facebook', carteInput.facebook);
        formData.append('linkdin', carteInput.linkdin);
        formData.append('whatsapp', carteInput.whatsapp);

        console.log('Submitting form data:', formData);

        axios.post(`/api/cartes`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
            console.log('Response from API:', res);  // Log the response to debug
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setErrorList([]);
                navigate('/user-cartes')
            } else if (res.data.status === 422) {
                swal("Desolé", "", "error");
                setErrorList(res.data.errors);
            }
        })
        .catch((err) => {
            console.error('Error:', err);
            swal("Desolé", "Une erreur est survenue", "error");
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
                                <h4>Ajouter une carte</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={carteSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Prénom</b></label>
                                            <input type="text" name="first_name" className="form-control" value={carteInput.first_name} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Nom</b></label>
                                            <input type="text" name="last_name" className="form-control" value={carteInput.last_name} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Adresse Email</b></label>
                                            <input type="email" name="email" className="form-control" value={carteInput.email} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Adresse</b></label>
                                            <input type="text" name="adress" className="form-control" value={carteInput.adress} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Téléphone</b></label>
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
                                            <label><b>Titre</b></label>
                                            <input type="text" name="title" className="form-control" value={carteInput.title} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Société</b></label>
                                            <input type="text" name="company" className="form-control" value={carteInput.company} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Site Web</b></label>
                                            <input type="text" name="website" className="form-control" value={carteInput.website} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Facebook</b></label>
                                            <input type="url" name="facebook" className="form-control" value={carteInput.facebook} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Linkdin</b></label>
                                            <input type="url" name="linkdin" className="form-control" value={carteInput.linkdin} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Whatsapp</b></label>
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
                                            <label><b>Logo</b></label>
                                            <input type="file" name="logo" className="form-control" onChange={handleLogo} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Photo</b></label>
                                            <input type="file" name="photo" className="form-control" onChange={handlePhoto} />
                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label><b>Arrière Plan</b></label>
                                            <input type="file" name="background_image" className="form-control" onChange={handleBackgroundImage} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group mb-3">
                                            <button type="submit" className="btn btn-primary">Enregistrer</button>
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
