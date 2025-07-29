import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Admin/Navbar/Navbar';
import { fetchCurrentAdmin } from '../../features/admin/adminSlice';
import { useDispatch } from 'react-redux';

const UserLayout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCurrentAdmin())
            .unwrap()
            .catch(() => {
                navigate('/admin/login');
            });
    }, [dispatch, navigate]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default UserLayout;
