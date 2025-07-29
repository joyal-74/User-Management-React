import React, { useState } from 'react'
import AdminDropdown from '../../../components/ui/adminDropdown';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const admin = useSelector((state) => state.admin.admin);
    const navigate = useNavigate();

    return (
        <div className='bg-neutral-800 px-20 py-4 flex justify-between shadow-lg shadow-neutral-750 fixed w-full'>
            <div className='logo-container'>
                <h1 className='text-2xl text-white font-medium cursor-pointer' onClick={() => navigate('/admin/dashboard')}>GenZ<span className='text-[10px] font-extralight'>soln</span></h1>
            </div>
            <div className='right-part flex gap-6 items-center'>
                <i className="fa-regular fa-bell text-white text-xl"></i>
                <div onClick={() => setShowDropdown(!showDropdown)} className='relative cursor-pointer'>
                    <p className='text-white capitalize'>{admin?.name}</p>
                    {showDropdown && <AdminDropdown />}
                </div>
            </div>
        </div>
    )
}

export default Navbar