import Profile from "../components/admin/Profile";
import Dashboard from "../components/admin/Dashboard";



const routes = [
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'profile',
        element: <Profile />
    },
    
];

export default routes;


