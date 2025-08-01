import React, { useState } from 'react'
import ProfileDropdown from '../../components/ui/ProfileDropdown';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import user_icon from '../../assets/avatar.png'

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const user = useSelector((state) => state.user.user);
    // console.log(user)
    const navigate = useNavigate();

    return (
        <div className='bg-neutral-800 px-20 py-4 flex justify-between shadow-lg shadow-neutral-750 fixed w-full'>
            <div className='logo-container'>
                <h1 className='text-2xl text-white font-medium cursor-pointer' onClick={()=> navigate('/')}>GenZ<span className='text-[10px] font-extralight'>soln</span></h1>
            </div>
            <div className='right-part flex gap-6 items-center'>
                <i className="fa-solid fa-moon fa-gear text-white text-xl"></i>
                <i className="fa-regular fa-bell text-white text-xl"></i>
                {user ? (
                    <div onClick={() => setShowDropdown(!showDropdown)} className='relative cursor-pointer'>
                        <img src={user.profilePic || user_icon} alt="" className='h-8 w-8 rounded-full' />
                        {showDropdown && <ProfileDropdown />}
                    </div>
                ) : (
                    <Link to="/login" className='text-white font-medium hover:underline'>
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar