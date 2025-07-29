import React from 'react'
import Input from '../../components/ui/Input'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { registerUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name must contain only letters';
        }

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

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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

        const action = await dispatch(registerUser(formData));
        console.log(action)
        if (registerUser.fulfilled.match(action)) {
            toast.success('User registered successfully!');
            navigate('/login')
        } else {
            toast.error(action.payload || 'Registration failed');
        }
    };


    return (
        <>
            <div className='relative flex flex-col items-center justify-center min-h-screen bg-neutral-900 px-4 py-8'>
                <div className='relative z-10 w-full max-w-sm'>
                    <div className='absolute inset-0 -z-10 transform -rotate-[5deg] bg-purple-700 rounded-md hidden sm:block'></div>

                    <form onSubmit={handleSubmit}>
                        <div className='login-container flex flex-col bg-neutral-800 w-full px-4 py-8 sm:px-5 sm:py-10 rounded-md shadow-xl shadow-neutral-900'>
                            <h1 className='text-2xl sm:text-3xl text-center font-semibold text-white mb-5'>Create Account</h1>
                            <Input label='Your Name' name='name' placeholder='Enter your name' onChange={handleChange} error={errors?.name} />
                            <Input label='Email Address' name='email' placeholder='Enter your email address' onChange={handleChange} error={errors?.email} />
                            <Input type='password' label='Password' name='password' placeholder='Enter your password' onChange={handleChange} error={errors?.password} />
                            <Input type='password' label='Confirm password' name='confirmPassword' placeholder='Please confirm your password' onChange={handleChange} error={errors?.confirmPassword} />
                            <p className='text-white text-center text-[13px] mt-4'>Already have account? <span className='text-purple-500 underline cursor-pointer' onClick={()=> navigate('/login')}>Sign In</span></p>

                            <button type='submit' className='bg-purple-700 py-3 rounded text-white mt-5 hover:bg-purple-800 transition-colors' disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
                <p className='absolute text-center text-white text-sm mt-2 bottom-4'>&copy; GenZ Solutions 2025</p>
            </div> 
        </>
    )
}

export default SignUp;