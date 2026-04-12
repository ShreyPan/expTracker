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
import { LuMail, LuShieldCheck, LuSparkles, LuUser } from 'react-icons/lu';

const formatDisplayDate = (value) => {
    if (!value) return 'Not available';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Not available';

    return date.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const getPasswordStrength = (password = '') => {
    let score = 0;

    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return Math.min(score, 4);
};

const strengthMeta = [
    { label: 'Very weak', color: 'bg-red-400' },
    { label: 'Weak', color: 'bg-orange-400' },
    { label: 'Good', color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-emerald-500' },
];

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
    const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

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
                setLastUpdatedAt(new Date().toISOString());
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

            setLastUpdatedAt(new Date().toISOString());
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

    const passwordStrength = getPasswordStrength(newPassword);
    const strengthConfig = strengthMeta[Math.max(passwordStrength - 1, 0)];

    return (
        <DashboardLayout activeMenu="Profile">
            <div className="my-6 mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <section className="card lg:col-span-1 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-purple-100/80" />
                        <div className="absolute -bottom-20 -left-14 w-36 h-36 rounded-full bg-purple-50" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-5">
                                {user?.profileImageUrl ? (
                                    <img
                                        src={fixImageUrl(user?.profileImageUrl)}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
                                    />
                                ) : (
                                    <DefaultAvatar size="w-20 h-20" textSize="text-xl" />
                                )}

                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">{user?.fullName}</h1>
                                    <p className="text-sm text-gray-600 break-all">{user?.email}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Member since</span>
                                    <span className="font-medium text-gray-800">{formatDisplayDate(user?.createdAt)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Last update</span>
                                    <span className="font-medium text-gray-800">{formatDisplayDate(lastUpdatedAt || user?.updatedAt)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Status</span>
                                    <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">Active</span>
                                </div>
                            </div>

                            <button
                                className="add-btn add-btn-fill w-full justify-center hover:bg-purple-600 transition-colors"
                                onClick={openEditProfileModal}
                            >
                                <LuUser className="text-sm" />
                                Edit Profile
                            </button>
                        </div>
                    </section>

                    <div className="lg:col-span-2 space-y-6">
                        <section className="card transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                                <span className="text-xs text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                                    <LuSparkles className="text-xs" />
                                    Personal details
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">Full Name</p>
                                    <p className="text-gray-900 font-semibold">{user?.fullName}</p>
                                </div>
                                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">Email</p>
                                    <p className="text-gray-900 font-semibold break-all flex items-center gap-2">
                                        <LuMail className="text-purple-600" />
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="card transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md text-sm font-medium"
                                    onClick={openPasswordModal}
                                >
                                    Update Password
                                </button>
                            </div>

                            <div className="pt-5 space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                                        <LuShieldCheck />
                                    </span>
                                    <div>
                                        <p className="font-medium text-gray-900">Keep your account secure</p>
                                        <p className="text-sm text-gray-600">
                                            Use your current password before setting a new one. Strong passwords include letters, numbers, and symbols.
                                        </p>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full w-1/2 bg-gradient-to-r from-[#875cf5] to-purple-500 rounded-full" />
                                </div>
                            </div>
                        </section>
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

                    {newPassword && (
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-gray-500">Password Strength</p>
                                <p className="text-xs font-semibold text-gray-700">{strengthConfig.label}</p>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map((level) => (
                                    <span
                                        key={level}
                                        className={`h-1.5 rounded-full ${passwordStrength >= level ? strengthConfig.color : 'bg-gray-200'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

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