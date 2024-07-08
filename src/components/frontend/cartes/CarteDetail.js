import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaFacebook, FaGlobe, FaLinkedin, FaPrint, FaWhatsapp } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

const CarteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carte, setCarte] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/cartes/${id}`)
            .then(response => {
                if (response.data.status === 200) {
                    setCarte(response.data.carte);
                } else {
                    console.error('Error: ', response.data.message);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la carte", error);
                setLoading(false);
            });
    }, [id]);

    const handlePrint = async () => {
        try {
            const response = await axios.get(`/api/cartes/${id}/print`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'carte.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Erreur lors du téléchargement du PDF", error);
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!carte) {
        return <div>Carte non trouvée</div>;
    }

    const cleanedWhatsAppNumber = carte.whatsapp.replace(/[^0-9]/g, '');
    const whatsappLink = `https://wa.me/${cleanedWhatsAppNumber}`;
    const websiteLink = carte.website;
    const facebookLink = carte.facebook;
    const linkedinLink = carte.linkdin;

    const styles = {
        card: {
            backgroundImage: `url(http://localhost:9000/${carte.background_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '300px',
            borderRadius: '10px',
            overflow: 'hidden',
            color: 'white',
            textShadow: '1px 1px 2px black',
            padding: '15px',
            position: 'relative',
        },
        button: {
            margin: '0 5px',
        },
        footer: {
            background: '#007bff',
            color: 'white',
            textAlign: 'center',
            padding: '20px 0',
            marginTop: '30px',
        },
        footerText: {
            margin: 0,
        },
        returnButton: {
            position: 'absolute',
            bottom: '10px',
            right: '10px',
        },
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card" style={styles.card}>
                        <div className="card-body">
                            <div className='d-flex justify-content-between'>
                                <button onClick={handlePrint} className='btn btn-primary' style={styles.button}>
                                    <FaPrint className="me-1" /> Télécharger
                                </button>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success" style={styles.button}>
                                    <FaWhatsapp className="me-1" /> WhatsApp
                                </a>
                                <a href={websiteLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={styles.button}>
                                    <FaGlobe className="me-1" /> Website
                                </a>
                                <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={styles.button}>
                                    <FaFacebook className="me-1" /> Facebook
                                </a>
                                <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={styles.button}>
                                    <FaLinkedin className="me-1" /> LinkedIn
                                </a>
                            </div>
                            <button onClick={() => navigate(-1)} className='btn btn-secondary' style={styles.returnButton}>
                            <FaArrowLeft /> Retour
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer style={styles.footer}>
                <div className="container text-center">
                    <p style={styles.footerText}>&copy; 2024 Carte de Visite. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default CarteDetail;
