import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { fixImageUrl } from '../../utils/helper';
import DefaultAvatar from '../../components/Cards/DefaultAvatar';

const Profile = () => {
    const { user } = useContext(UserContext);

    return (
        <DashboardLayout activeMenu="Profile">
            <div className="my-5 mx-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="card">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#875cf5] to-purple-600 px-6 py-8 rounded-2xl mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    {user?.profileImageUrl ? (
                                        <img
                                            src={fixImageUrl(user?.profileImageUrl)}
                                            alt="Profile"
                                            className="w-20 h-20 rounded-full border-4 border-white object-cover"
                                        />
                                    ) : (
                                        <DefaultAvatar size="w-20 h-20" textSize="text-xl" />
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">{user?.fullName}</h1>
                                    <p className="text-purple-100">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="">
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                        Profile Information
                                    </h2>
                                    <button className="add-btn add-btn-fill hover:bg-purple-600 transition-colors">
                                        Edit Profile
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="card">
                                        <label className="block text-sm font-medium text-gray-500 mb-2">
                                            Full Name
                                        </label>
                                        <p className="text-gray-800 font-medium">{user?.fullName}</p>
                                    </div>

                                    <div className="card">
                                        <label className="block text-sm font-medium text-gray-500 mb-2">
                                            Email
                                        </label>
                                        <p className="text-gray-800 font-medium">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                        Password
                                    </h2>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md">
                                        Change Password
                                    </button>
                                </div>

                                <div className="card">
                                    <p className="text-gray-600">
                                        Click "Change Password" to update your password securely.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;