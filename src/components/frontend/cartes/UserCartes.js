import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../../layouts/frontend/Navbar';
import swal from 'sweetalert';
import { FaEdit, FaGlobe, FaTrash } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';

export default function UserCartes() {
    const [cartes, setCartes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/cartes`)
            .then(res => {
                if (res.data.status === 200) {
                    setCartes(res.data.cartes);
                    setLoading(false);
                } else {
                    console.error('Erreur de récupération des cartes');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const deleteCarte = (id) => {
        axios.delete(`/api/cartes/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setCartes(cartes.filter(carte => carte.id !== id));
                } else {
                    swal("Desolé", res.data.message, "error");
                }
            })
            .catch(err => {
                console.error('Error:', err);
                swal("Desolé", "Une erreur est survenue", "error");
            });
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row">
                    {cartes.length > 0 ? (
                        cartes.map(carte => (
                            <div className="col-md-4 mb-4" key={carte.id}>
                                <div className="card" style={{ backgroundImage: `url(http://localhost:9000/${carte.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '300px' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{carte.title}
                                            <span><img src={`http://localhost:9000/${carte.logo}`} width="50px" alt={carte.logo} /></span>
                                        </h5>
                                        <p className="card-text">Nom: {carte.first_name} {carte.last_name}</p>
                                        <p className="card-text">Email: {carte.email}</p>
                                        <p className="card-text">Adresse: {carte.adress}</p>
                                        <p className="card-text">Téléphone: {carte.phone}</p>
                                        <p className="card-text">Société: {carte.company}</p>
                                        <p className="card-text">Site Web: {carte.website}</p>
                                        <p>
                                            <img src={`http://localhost:9000/${carte.photo}`} width="50px" alt={carte.photo} />
                                        </p>
                                        <p>
                                            <img src={`http://localhost:9000/${carte.qr_code}`} width="50px" alt={carte.qr_code} />
                                        </p>
                                        <Link to={`/carte-detail/${carte.id}`} className="btn btn-primary mt-2 me-1"><FaGlobe className='me-1' />Web-info</Link>
                                        <Link to={`/edit-carte/${carte.id}`} className="btn btn-success mt-2 me-1"><FaEdit className='me-1' /> Editer</Link>
                                        <button onClick={() => deleteCarte(carte.id)} className="btn btn-danger mt-2"><FaTrash className='me-1' /> Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-md-12">
                            <div className="alert alert-info" role="alert">
                                Aucune carte trouvée.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}