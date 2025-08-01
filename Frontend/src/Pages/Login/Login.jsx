import React, { useState } from 'react'
import Input from '../../components/ui/Input'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const action = await dispatch(loginUser(formData));

        if (loginUser.fulfilled.match(action)) {
            toast.success('User Logged In successfully!');
            navigate('/')
        } else {
            toast.error(action.payload || 'Login failed');
        }
    };

    return (
        <>
            <div className='relative flex flex-col items-center justify-center min-h-screen bg-neutral-900 px-4 py-10'>
                <div className='relative z-10 w-full max-w-sm'>
                    <div className='absolute inset-0 -z-10 transform -rotate-[5deg] bg-purple-700 rounded-md hidden sm:block'></div>

                    <form onSubmit={handleSubmit}>
                        <div className='login-container flex flex-col bg-neutral-800 w-full px-4 py-10 sm:px-5 sm:py-10 rounded-md shadow-xl shadow-neutral-900'>
                            <h1 className='text-2xl sm:text-3xl text-center font-semibold text-white mb-10'>Welcome Back</h1>
                            <Input label='Email Address' name='email' placeholder='Enter your email address' onChange={handleChange} error={errors?.email} />
                            <Input type='password' label='Password' name='password' placeholder='Enter your password' onChange={handleChange} error={errors?.password} />
                            <p className='text-purple-500 text-center text-[13px]'>Forgot password ?</p>
                            <p className='text-white text-center text-[13px] mt-4'>New User? <span className='text-purple-500 underline cursor-pointer' onClick={()=> navigate('/signup')}>Sign Up</span></p>

                            <button type='submit' className='bg-purple-700 py-3 rounded text-white mt-6 hover:bg-purple-800 transition-colors' disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
                <p className='absolute text-center text-white text-sm mt-2 bottom-4'>&copy; GenZ Solutions 2025</p>
            </div>
        </>
    )
}

export default Login;