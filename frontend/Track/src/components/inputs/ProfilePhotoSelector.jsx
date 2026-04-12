import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage, currentImageUrl = null, disabled = false }) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }

    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        if (disabled) return;
        inputRef.current.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
                disabled={disabled}
            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                    {currentImageUrl ? (
                        <img
                            src={currentImageUrl}
                            alt="current profile photo"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <LuUser className="text-4xl text-[#875cf5]" />
                    )}

                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-[#875cf5] text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={onChooseFile}
                        title={currentImageUrl ? 'Change profile photo' : 'Upload profile photo'}
                        disabled={disabled}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="profile photo"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={handleRemoveImage}
                        disabled={disabled}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}

        </div>
    )
}

export default ProfilePhotoSelector
