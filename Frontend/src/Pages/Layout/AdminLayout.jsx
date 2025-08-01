import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Admin/Navbar/Navbar';
import { fetchCurrentAdmin } from '../../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const admin = useSelector((state) => state.admin.admin);

    useEffect(() => {
        if (!admin) {
            dispatch(fetchCurrentAdmin())
                .unwrap()
                .catch(() => {
                    navigate('/admin/login');
                });
        }

    }, [admin, dispatch, navigate]);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default UserLayout;
