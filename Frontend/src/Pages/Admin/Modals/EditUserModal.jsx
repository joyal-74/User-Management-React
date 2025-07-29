import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        username: user?.username || '',
        phone: user?.phone || '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                username: user.username || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(user._id, formData);
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur" onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
                <div className="bg-neutral-800 rounded-lg w-full max-w-md border border-neutral-700" onClick={handleModalClick} >
                    <div className="flex justify-between items-center p-4 border-b border-neutral-700">
                        <h2 className="text-xl font-semibold text-white">Edit User</h2>
                        <button
                            onClick={onClose}
                            className="text-neutral-400 hover:text-white rounded-full p-1 hover:bg-neutral-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
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
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditUserModal;