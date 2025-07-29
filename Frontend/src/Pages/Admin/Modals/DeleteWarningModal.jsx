import { AlertTriangle } from 'lucide-react';

const DeleteWarningModal = ({ isOpen, onClose, onConfirm, userName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-neutral-800 rounded-lg w-full max-w-md border border-neutral-700">
                <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/30 text-red-400 mb-4">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Delete User</h3>
                        <p className="text-sm text-neutral-400 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-white">{userName}</span>? This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-center space-x-4 w-full">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-md bg-neutral-700 text-neutral-200 hover:bg-neutral-600 transition-colors w-1/2"
                            > Cancel </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition-colors w-1/2"
                            > Delete </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteWarningModal;