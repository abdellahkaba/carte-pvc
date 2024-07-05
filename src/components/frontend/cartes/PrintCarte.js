import React from 'react';
import axios from 'axios';

const PrintCarte = ({ carte }) => {

    const handlePrint = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:9000/api/cartes/${carte.id}/print`, {
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

    return (
        <button onClick={handlePrint} className='btn btn-primary'>
            Imprimer la Carte
        </button>
    );
};

export default PrintCarte;