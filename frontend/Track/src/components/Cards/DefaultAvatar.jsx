import React from 'react';

const DefaultAvatar = ({ size = 'w-20 h-20', textSize = 'text-xl' }) => {
    return (
        <div className={`${size} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${textSize} text-white font-semibold`}>
            <svg
                className="w-2/3 h-2/3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

export default DefaultAvatar;