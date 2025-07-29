import React from 'react';

const Input = ({ label, error, ...props }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-1">
                {label}
            </label>
            <input
                {...props}
                className={`w-full px-4 py-2 rounded bg-neutral-500 text-white border ${error ? 'border-red-500' : 'border-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
            />
            {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
        </div>
    );
};

export default Input;
