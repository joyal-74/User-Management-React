import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../features/user/userSlice';

const UserLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default UserLayout;
