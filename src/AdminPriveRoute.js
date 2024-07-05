import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios';
import swal from 'sweetalert';

const AdminPrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('auth_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then(res => {
            if (res.status === 200) {
                setIsAuthenticated(true);
            }
            setLoading(false);
        }).catch(() => {
            swal('Erreur', 'Vous n\'êtes pas connecté !', 'error');
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <h2>Loading....</h2>;
    }

    return isAuthenticated ? (
        <MasterLayout>
            <Outlet />
        </MasterLayout>
    ) : (
        <Navigate to="/login" />
    );
}

export default AdminPrivateRoute;