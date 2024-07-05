import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaPrint, FaEdit, FaWhatsapp, FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa';

const CarteDetail = () => {
    const { id } = useParams();
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

            // Create a link to download the PDF
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

    const whatsappLink = `https://wa.me/${carte.whatsapp}`;
    const websiteLink = carte.website;
    const facebookLink = carte.facebook;
    const linkedinLink = carte.linkdin;

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
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
                            <p>
                                <img src={`http://localhost:9000/${carte.photo}`} width="50px" alt={carte.photo} />
                            </p>
                            <p>
                                <img src={`http://localhost:9000/${carte.qr_code}`} width="50px" alt={carte.qr_code} />
                            </p>
                            <div className='d-flex justify-content-between'>
                                <div className="me-2">
                                    <button onClick={handlePrint} className='btn btn-primary'>
                                        <FaPrint className="me-1" /> Télécharger
                                    </button>
                                </div>
                                <div className="ms-2">
                                    <a href={whatsappLink} className="btn btn-success">
                                        <FaWhatsapp className="me-1" /> WhatsApp
                                    </a>
                                </div>
                                <div className="ms-2">
                                    <a href={websiteLink} className="btn btn-primary">
                                        <FaGlobe className="me-1" /> Website
                                    </a>
                                </div>
                                <div className="ms-2">
                                    <a href={facebookLink} className="btn btn-primary">
                                        <FaFacebook className="me-1" /> Facebook
                                    </a>
                                </div>
                                <div className="ms-2">
                                    <a href={linkedinLink} className="btn btn-primary">
                                        <FaLinkedin className="me-1" /> LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarteDetail;
