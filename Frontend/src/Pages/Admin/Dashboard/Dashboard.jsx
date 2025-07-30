import { Edit, Trash2, User, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, editUser, fetchAllUsers, searchUser } from '../../../features/admin/adminSlice';
import EditUserModal from '../Modals/EditUserModal';
import DeleteWarningModal from '../Modals/DeleteWarningModal';
import { toast } from 'react-toastify'
import AddUserModal from '../Modals/AddUserModal';

const Dashboard = () => {
    const { users, totalPages } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(fetchAllUsers({ page: currentPage, limit }));
    }, [currentPage, dispatch]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleAddUser = async (updatedData) => {
        try {
            await dispatch(addUser(updatedData)).unwrap();
            toast.success('User added successfully..!')
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error(error || 'User added successfully..!')
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (userId, updatedData) => {
        dispatch(editUser({ userId, updatedData }));
        setIsEditModalOpen(false);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteUser(selectedUser._id));
        toast.success('User deleted successfully..!')
        setIsDeleteModalOpen(false);
    };

    const handleSearchUsers = () => {
        dispatch(searchUser({ query, page: currentPage, limit }));
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 p-6">
            <div className="max-w-7xl mx-auto pt-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">
                        <span className="text-purple-400">GenZ</span> Dashboard
                    </h1>
                    <div className='space-x-3 flex'>
                        <div className='flex relative'>
                            <input type="text" className='px-4 py-2 rounded-l-md bg-purple-500/30 border border-purple-500 focus:outline-none focus:ring-0' onChange={(e)=> setQuery(e.target.value)} />
                            <button className='bg-purple-500 rounded-r-sm px-2' onClick={handleSearchUsers}>< Search className=' right-2 top-2' /></button>
                        </div>
                        <button className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-sm transition-colors duration-200" onClick={handleAdd}>
                            + New User
                        </button>
                    </div>
                </div>

                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Profile</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Username</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-300 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-700">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-neutral-700/30 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {user.profilePic ? (
                                                        <img className="h-10 w-10 rounded-full border border-purple-500/30" src={user.profilePic} alt="" />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center">
                                                            <User className="h-5 w-5 text-purple-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-white">{user.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-neutral-300">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-neutral-300">{user.username}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-neutral-300">{user.phone || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="text-purple-400 hover:text-purple-300 p-1 rounded-full hover:bg-purple-900/30 transition-colors duration-200"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/30 transition-colors duration-200"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-400">
                        Page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded-md ${currentPage === 1
                                ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                                : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'}`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={`px-3 py-1 rounded-md ${currentPage === number
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'}`}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded-md ${currentPage === totalPages
                                ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                                : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-300'}`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <EditUserModal
                    user={selectedUser}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveEdit}
                />

                <AddUserModal
                    user={selectedUser}
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAddUser}
                />

                <DeleteWarningModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    userName={selectedUser?.name || ''}
                />


            </div>
        </div>
    );
};

export default Dashboard;