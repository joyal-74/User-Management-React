import React from 'react'
import { logout, logoutAdmin } from '../../features/admin/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logoutAdmin());
            dispatch(logout());
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            <div className='bg-neutral-800 absolute top-11 left-1/2 -translate-x-1/2 rounded text-white text-sm shadow-lg shadow-neutral-900 z-60'>
                <p className='px-5 py-3 hover:bg-neutral-700 flex gap-2 items-center' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket fa-sm"></i> Logout</p>
            </div>
        </div>
    )
}

export default ProfileDropdown
