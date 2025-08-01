import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchCurrentAdmin } from '../features/admin/adminSlice';

const PublicRouteAdmin = ({ children }) => {
    const admin = useSelector((state) => state.admin.admin);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!admin) {
            dispatch(fetchCurrentAdmin());
        }
    }, [dispatch, admin]);

    if (admin) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default PublicRouteAdmin;
