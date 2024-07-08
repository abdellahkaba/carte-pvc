import React from 'react';
import Navbar from '../../layouts/frontend/Navbar';
import { FaIdCard, FaRegHandPointRight, FaRegAddressCard, FaFacebook, FaLinkedin, FaGlobe, FaEnvelope } from 'react-icons/fa';
import backgroundImage from '../../assets/frontend/images/digital2.png';

const styles = {
    heroSection: {
        position: 'relative',
        background: `url(${backgroundImage}) no-repeat center center/cover`,
        color: 'white',
        textAlign: 'center',
        padding: '100px 0',
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // overlay semi-transparent
        zIndex: 1,
    },
    heroContent: {
        position: 'relative',
        zIndex: 2,
    },
    heroTitle: {
        fontSize: '3em',
        marginBottom: '20px',
    },
    heroText: {
        fontSize: '1.5em',
        marginBottom: '40px',
    },
    heroButton: {
        fontSize: '1.2em',
        padding: '10px 30px',
    },
    featuresSection: {
        background: '#f8f9fa',
        padding: '60px 0',
    },
    featureIcon: {
        fontSize: '4em',
        color: '#007bff',
        marginBottom: '20px',
    },
    featureIconHover: {
        color: '#0056b3',
    },
    featureTitle: {
        fontSize: '1.5em',
        marginBottom: '20px',
    },
    footerSection: {
        background: '#007bff',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
    },
    footerText: {
        margin: 0,
        fontSize: '1.2em',
    },
    footerLinks: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '15px',
    },
    footerLink: {
        color: 'white',
        fontSize: '1.5em',
        transition: 'color 0.3s',
    },
    footerLinkHover: {
        color: '#ddd',
    },
};

export default function Home() {
    return (
        <div>
            <Navbar />
            <header style={styles.heroSection}>
                <div style={styles.heroOverlay}></div>
                <div className="container" style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>Bienvenue sur votre Application de Cartes de Visite</h1>
                    <p style={styles.heroText}>Créez et partagez vos cartes de visite en toute simplicité</p>
                    <a href="/register" className="btn btn-primary btn-lg" style={styles.heroButton}>Commencer</a>
                </div>
            </header>
            <section style={styles.featuresSection} className="text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <FaIdCard style={styles.featureIcon} className="feature-icon" />
                            <h3 style={styles.featureTitle}>Créer vos Cartes</h3>
                            <p>Utilisez notre plateforme pour créer vos cartes de visite professionnelles en quelques minutes.</p>
                        </div>
                        <div className="col-md-4">
                            <FaRegHandPointRight style={styles.featureIcon} className="feature-icon" />
                            <h3 style={styles.featureTitle}>Partager Facilement</h3>
                            <p>Partagez vos cartes de visite avec vos contacts en un clic.</p>
                        </div>
                        <div className="col-md-4">
                            <FaRegAddressCard style={styles.featureIcon} className="feature-icon" />
                            <h3 style={styles.featureTitle}>Gérer Vos Cartes</h3>
                            <p>Accédez à vos cartes de visite à tout moment et gérez vos informations facilement.</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer style={styles.footerSection}>
                <div className="container text-center">
                    <div style={styles.footerLinks}>
                        <a href="https://www.digitaldounia.com/" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
                            <FaGlobe />
                        </a>
                        <a href="https://www.facebook.com/DigitalDounia/" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
                            <FaFacebook />
                        </a>
                        
                        <a href="mailto:contact@yourcompany.com" style={styles.footerLink}>
                            <FaEnvelope />
                        </a>
                        
                        <a href="https://www.linkedin.com/in/itarpaga/" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
                            <FaLinkedin />
                        </a>
                    </div>
                    <p style={styles.footerText}>&copy; 2024 Carte de Visite. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
}
