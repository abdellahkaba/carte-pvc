import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../layouts/frontend/Navbar';
import swal from 'sweetalert';
import { FaEdit, FaGlobe, FaTrash, FaArrowLeft } from 'react-icons/fa';

const styles = {
    card: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '350px',
        color: 'white',
        textShadow: '1px 1px 2px black',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '30px',
    },
    cardBody: {
        background: 'rgba(0, 0, 0, 0.6)',
        padding: '20px',
        borderRadius: '10px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardText: {
        marginBottom: '0.5rem',
    },
    image: {
        width: '60px',
        height: 'auto',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
    },
    footer: {
        background: '#007bff',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        position: 'fixed',
        width: '100%',
        bottom: 0,
    },
    footerText: {
        margin: 0,
    },
    backButton: {
        display: 'block',
        margin: '20px 0',
    },
};

export default function UserCartes() {
    const [cartes, setCartes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
        swal({
            title: "Êtes-vous sûr?",
            text: "Une fois supprimée, vous ne pourrez pas récupérer cette carte!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/api/cartes/${id}`)
                    .then(res => {
                        if (res.data.status === 200) {
                            swal("Success", res.data.message, "success");
                            setCartes(cartes.filter(carte => carte.id !== id));
                        } else {
                            swal("Désolé", res.data.message, "error");
                        }
                    })
                    .catch(err => {
                        console.error('Error:', err);
                        swal("Désolé", "Une erreur est survenue", "error");
                    });
            } else {
                swal("La carte n'a pas été supprimée");
            }
        });
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <button className="btn btn-secondary" onClick={() => navigate(-1)} style={styles.backButton}>
                    <FaArrowLeft /> Retour
                </button>
                <div className="row">
                    {cartes.length > 0 ? (
                        cartes.map(carte => (
                            <div className="col-md-4" key={carte.id}>
                                <div className="card custom-card" style={{
                                    ...styles.card,
                                    backgroundImage: `url(http://localhost:9000/${carte.background_image})`,
                                }}>
                                    <div className="card-body" style={styles.cardBody}>
                                        <div style={styles.cardTitle}>
                                            {carte.title}
                                            <img src={`http://localhost:9000/${carte.logo}`} style={styles.image} alt={carte.title} />
                                        </div>
                                        <p style={styles.cardText}>Nom: {carte.first_name} {carte.last_name}</p>
                                        <p style={styles.cardText}>Email: {carte.email}</p>
                                        <p style={styles.cardText}>Adresse: {carte.adress}</p>
                                        <p style={styles.cardText}>Téléphone: {carte.phone}</p>
                                        <p style={styles.cardText}>Société: {carte.company}</p>
                                        <p style={styles.cardText}>Site Web: {carte.website}</p>
                                         eslint-disable-next-line react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes, react/jsx-no-comment-textnodes
                                        <div className="d-flex justify-content-center mt-2">
                                             eslint-disable-next-line jsx-a11y/img-redundant-alt
                                            <img src={`http://localhost:9000/${carte.photo}`} className="me-2" style={styles.image} alt="Photo" />
                                            <img src={`http://localhost:9000/${carte.qr_code}`} style={styles.image} alt="QR Code" />
                                        </div>
                                        <div style={styles.buttonGroup}>
                                            <Link to={`/carte-detail/${carte.id}`} className="btn btn-primary"><FaGlobe className='me-1' /> Web-info</Link>
                                            <Link to={`/edit-carte/${carte.id}`} className="btn btn-success"><FaEdit className='me-1' /> Editer</Link>
                                            <button onClick={() => deleteCarte(carte.id)} className="btn btn-danger"><FaTrash className='me-1' /> Supprimer</button>
                                        </div>
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
            <footer style={styles.footer}>
                <div className="container text-center">
                    <p style={styles.footerText}>&copy; 2024 Carte de Visite. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}
