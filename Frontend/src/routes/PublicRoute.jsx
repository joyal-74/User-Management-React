import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchCurrentUser } from '../features/user/userSlice';

const PublicRoute = ({ children }) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch, user]);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
