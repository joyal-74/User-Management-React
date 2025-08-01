import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../features/user/userSlice';

const UserLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (!user) {
            dispatch(fetchCurrentUser())
                .unwrap()
                .catch(() => {
                    navigate('/login');
                });;
        }
    }, [dispatch, user]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default UserLayout;
