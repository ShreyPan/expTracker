import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { fixImageUrl } from '../../utils/helper';
import DefaultAvatar from '../../components/Cards/DefaultAvatar';
import Modal from '../../components/Modal';
import Input from '../../components/inputs/Input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, updateUser } = useContext(UserContext);

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const [fullName, setFullName] = useState(user?.fullName || '');
    const [profilePic, setProfilePic] = useState(null);
    const [profileError, setProfileError] = useState('');
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    const openEditProfileModal = () => {
        setFullName(user?.fullName || '');
        setProfilePic(null);
        setProfileError('');
        setIsEditProfileOpen(true);
    };

    const closeEditProfileModal = () => {
        setIsEditProfileOpen(false);
    };

    const openPasswordModal = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setIsChangePasswordOpen(true);
    };

    const closePasswordModal = () => {
        setIsChangePasswordOpen(false);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            const message = 'Please enter your full name.';
            setProfileError(message);
            toast.error(message);
            return;
        }

        setIsProfileLoading(true);
        setProfileError('');

        try {
            let profileImageUrl = user?.profileImageUrl || null;

            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes?.imageUrl || profileImageUrl;
            }

            const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
                fullName: fullName.trim(),
                profileImageUrl,
            });

            if (response?.data?.user) {
                updateUser(response.data.user);
                toast.success('Profile updated successfully.');
                setTimeout(() => {
                    setIsEditProfileOpen(false);
                }, 500);
            }
        } catch (error) {
            const message =
                error?.response?.data?.details ||
                error?.response?.data?.message ||
                'Failed to update profile. Please try again.';
            setProfileError(message);
            toast.error(message);
        } finally {
            setIsProfileLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (!currentPassword) {
            const message = 'Please enter your current password.';
            setPasswordError(message);
            toast.error(message);
            return;
        }

        if (!newPassword) {
            const message = 'Please enter a new password.';
            setPasswordError(message);
            toast.error(message);
            return;
        }

        if (newPassword.length < 6) {
            const message = 'New password must be at least 6 characters long.';
            setPasswordError(message);
            toast.error(message);
            return;
        }

        if (newPassword !== confirmPassword) {
            const message = 'New password and confirm password do not match.';
            setPasswordError(message);
            toast.error(message);
            return;
        }

        setIsPasswordLoading(true);
        setPasswordError('');

        try {
            await axiosInstance.put(API_PATHS.AUTH.CHANGE_PASSWORD, {
                currentPassword,
                newPassword,
            });

            toast.success('Password updated successfully.');
            setTimeout(() => {
                setIsChangePasswordOpen(false);
            }, 500);
        } catch (error) {
            const message =
                error?.response?.data?.details ||
                error?.response?.data?.message ||
                'Failed to update password. Please try again.';
            setPasswordError(message);
            toast.error(message);
        } finally {
            setIsPasswordLoading(false);
        }
    };

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
                                    <button
                                        className="add-btn add-btn-fill hover:bg-purple-600 transition-colors"
                                        onClick={openEditProfileModal}
                                    >
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
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md"
                                        onClick={openPasswordModal}
                                    >
                                        Update Password
                                    </button>
                                </div>

                                <div className="card">
                                    <p className="text-gray-600">
                                        Click "Update Password" and enter your current password before setting a new one.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isEditProfileOpen}
                onClose={closeEditProfileModal}
                title="Edit Profile"
            >
                <form onSubmit={handleUpdateProfile}>
                    <ProfilePhotoSelector
                        image={profilePic}
                        setImage={setProfilePic}
                        currentImageUrl={user?.profileImageUrl ? fixImageUrl(user.profileImageUrl) : null}
                    />

                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                    />

                    {profileError && <p className="text-red-500 text-xs pb-2.5">{profileError}</p>}

                    <button type="submit" className="btn-primary" disabled={isProfileLoading}>
                        {isProfileLoading ? 'Updating...' : 'Save Changes'}
                    </button>
                </form>
            </Modal>

            <Modal
                isOpen={isChangePasswordOpen}
                onClose={closePasswordModal}
                title="Update Password"
            >
                <form onSubmit={handleUpdatePassword}>
                    <Input
                        label="Current Password"
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={({ target }) => setCurrentPassword(target.value)}
                    />

                    <Input
                        label="New Password"
                        type="password"
                        placeholder="Min 6 characters"
                        value={newPassword}
                        onChange={({ target }) => setNewPassword(target.value)}
                    />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={({ target }) => setConfirmPassword(target.value)}
                    />

                    {passwordError && <p className="text-red-500 text-xs pb-2.5">{passwordError}</p>}

                    <button type="submit" className="btn-primary" disabled={isPasswordLoading}>
                        {isPasswordLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default Profile;