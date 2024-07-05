import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Navbar from '../../../layouts/frontend/Navbar';

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
        const formData = new FormData();
        formData.append('photo', pictures.photo);
        formData.append('logo', pictures.logo);
        formData.append('background_image', pictures.background_image);
        formData.append('first_name', carteInput.first_name || ''); // Utiliser une chaîne vide si null
        formData.append('last_name', carteInput.last_name || ''); // Utiliser une chaîne vide si null
        formData.append('email', carteInput.email || ''); // Utiliser une chaîne vide si null
        formData.append('adress', carteInput.adress || ''); // Utiliser une chaîne vide si null
        formData.append('phone', carteInput.phone || ''); // Utiliser une chaîne vide si null
        formData.append('title', carteInput.title || ''); // Utiliser une chaîne vide si null
        formData.append('company', carteInput.company || ''); // Utiliser une chaîne vide si null
        formData.append('website', carteInput.website || ''); // Utiliser une chaîne vide si null
        formData.append('facebook', carteInput.facebook || ''); // Utiliser une chaîne vide si null
        formData.append('linkdin', carteInput.linkdin || ''); // Utiliser une chaîne vide si null
        formData.append('whatsapp', carteInput.whatsapp || ''); // Utiliser une chaîne vide si null

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
    };

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Modifier la Carte</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={carteUpdate}>
                                    <div className="row">
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Prénom</label>
                                            <input type="text" name="first_name" className="form-control" value={carteInput.first_name || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Nom</label>
                                            <input type="text" name="last_name" className="form-control" value={carteInput.last_name || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Adresse Email</label>
                                            <input type="email" name="email" className="form-control" value={carteInput.email || ''} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Adresse</label>
                                            <input type="text" name="adress" className="form-control" value={carteInput.adress || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Téléphone</label>
                                            <input type="text" name="phone" className="form-control" value={carteInput.phone || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Titre</label>
                                            <input type="text" name="title" className="form-control" value={carteInput.title || ''} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Société</label>
                                            <input type="text" name="company" className="form-control" value={carteInput.company || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Site Web</label>
                                            <input type="text" name="website" className="form-control" value={carteInput.website || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Facebook</label>
                                            <input type="url" name="facebook" className="form-control" value={carteInput.facebook || ''} onChange={handleInput} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Linkdin</label>
                                            <input type="url" name="linkdin" className="form-control" value={carteInput.linkdin || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Whatsapp</label>
                                            <input type="text" name="whatsapp" className="form-control" value={carteInput.whatsapp || ''} onChange={handleInput} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Logo</label>
                                            <input type="file" name="logo" className="form-control" onChange={handleLogo} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Photo</label>
                                            <input type="file" name="photo" className="form-control" onChange={handlePhoto} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
                                            <label>Arrière Plan</label>
                                            <input type="file" name="background_image" className="form-control" onChange={handleBackgroundImage} />
                                        </div>
                                        <div className="col-md-4 form-group mb-3">
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
