import { useState } from 'react';

export const useImageUpload = () => {
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'user-management');

        setUploading(true);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/dugzfgs6o/image/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (!res.ok || !data.secure_url) throw new Error('Upload failed');
            return data.secure_url;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading };
};
