import { X, Upload, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useImageUpload } from '../../../Hooks/useImageUpload';

const AddUserModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        phone: '',
        profilePic: null
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: '',
                email: '',
                username: '',
                phone: '',
                profilePic: null
            });
            setPreviewImage(null);
            setErrors({});
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name required';
        } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
            newErrors.name = 'Only letters allowed for name';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username required';
        } else if (!/^(?=.*[A-Za-z])[A-Za-z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'please include letters';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone Number required';
        } else if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Enter 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const { uploadImage } = useImageUpload();

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setErrors(prev => ({ ...prev, profilePic: 'Only JPG/PNG files are allowed' }));
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, profilePic: 'File size must be less than 2MB' }));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);

        try {
            const url = await uploadImage(file);
            setFormData(prev => ({ ...prev, profilePic: url }));
            setErrors(prev => ({ ...prev, profilePic: undefined }));
        } catch (err) {
            setErrors(prev => ({ ...prev, profilePic: 'Upload failed' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('username', formData.username);
        formDataToSend.append('phone', formData.phone);

        if (formData.profilePic) {
            formDataToSend.append('profilePic', formData.profilePic);
        }

        await onSave(formDataToSend);
        onClose();
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur" onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
                <div className="bg-neutral-800 rounded-lg w-full max-w-md border border-neutral-700" onClick={handleModalClick}>
                    <div className="flex justify-between items-center p-4 border-b border-neutral-700">
                        <h2 className="text-xl font-semibold text-white">Add New User</h2>
                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-white rounded-full p-1 hover:bg-neutral-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="space-y-4">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4">
                                    <div className="h-24 w-24 rounded-full bg-neutral-700 border-2 border-dashed border-purple-500/30 flex items-center justify-center overflow-hidden">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <User className="h-10 w-10 text-purple-400" />
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-full cursor-pointer">
                                        <Upload className="h-4 w-4" />
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/jpeg, image/png"
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="text-xs text-neutral-400 mt-1">
                                    JPG, PNG (Max 2MB)
                                </p>
                                {errors.profilePic && (
                                    <p className="text-xs text-red-400 mt-1">{errors.profilePic}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-neutral-700 border ${errors.name ? 'border-red-500' : 'border-neutral-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-neutral-700 border ${errors.email ? 'border-red-500' : 'border-neutral-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full bg-neutral-700 border ${errors.username ? 'border-red-500' : 'border-neutral-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                    
                                />
                                {errors.username && (
                                    <p className="text-xs text-red-400 mt-1">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full bg-neutral-700 border ${errors.phone ? 'border-red-500' : 'border-neutral-600'} rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500`}
                                />
                                {errors.phone && (
                                    <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-md bg-neutral-700 text-neutral-200 hover:bg-neutral-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-500 transition-colors"
                            >
                                Add User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddUserModal;