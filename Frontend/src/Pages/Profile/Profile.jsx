import React, { useState } from 'react';
import { User, Shield, Settings, Edit2 } from 'lucide-react';

const UserProfile = () => {
    const [formData, setFormData] = useState({ fullname: '', email: '', phone: '', username: '', bio: '' });

    const [previewImage, setPreviewImage] = useState('/api/placeholder/120/120');
    const [isSuccess, setIsSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('Profile');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        document.getElementById('image-upload').click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Updated Profile:', formData);
    };

    const sidebarItems = [
        { name: 'Profile', icon: User, active: true },
        { name: 'Privacy', icon: Shield, active: false },
        { name: 'Settings', icon: Settings, active: false }
    ];

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 flex">
            <div className="w-64 bg-neutral-800 border-r border-neutral-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-8 flex items-center gap-2">
                    <span className="text-purple-400">GenZ</span> Account
                </h2>
                <nav className="space-y-2">
                    {sidebarItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-all duration-200 ${activeTab === item.name
                                        ? 'bg-purple-700/30 text-white border border-purple-500/50'
                                        : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100'
                                    }`}
                            >
                                <IconComponent size={18} className={activeTab === item.name ? "text-purple-400" : "text-neutral-400"} />
                                <span className="font-medium">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-semibold text-white mb-8">Profile Settings</h1>

                    <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg">
                        <div className="bg-gradient-to-r from-purple-900/50 to-neutral-800 px-8 py-6 border-b border-neutral-700">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div
                                        className="relative cursor-pointer"
                                        onClick={handleImageClick}
                                    >
                                        <img
                                            src={previewImage}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/50 shadow-lg transition-all duration-200 group-hover:border-purple-400"
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-2 shadow-lg group-hover:bg-purple-400 transition-all duration-200">
                                            <Edit2 size={14} className="text-white" />
                                        </div>
                                    </div>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        {formData.fullname || 'GenZ User'}
                                    </h2>
                                    <p className="text-purple-400">@{formData.username || 'user07_'}</p>
                                </div>
                            </div>
                        </div>

                        <form action="" onSubmit={handleSubmit}>
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-neutral-400 transition-all duration-200"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-neutral-400 transition-all duration-200"
                                            placeholder="Your username"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-neutral-400 transition-all duration-200"
                                            placeholder="user@gmail.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-neutral-400 transition-all duration-200"
                                            placeholder="+91 7345678900"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-neutral-400 transition-all duration-200"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end mt-8 pt-6 border-t border-neutral-700">
                                    <button
                                        type="button"
                                        className="px-6 py-2 text-neutral-300 bg-neutral-700 font-medium rounded-lg hover:bg-neutral-600 hover:text-neutral-200 transition-all duration-200 mr-4 border border-neutral-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md border border-purple-500 hover:border-purple-400"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;