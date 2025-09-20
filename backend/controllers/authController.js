const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        const accessToken = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.status(201).json({
            id: user._id,
            user,
            token: accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const accessToken = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.status(200).json({
            id: user._id,
            user,
            token: accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({ message: "Error logging in user", error: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500)
            .json({ message: "Error getting user info", error: err.message });
    }
}

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token is required" });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        res.status(401).json({ message: "Invalid refresh token", error: err.message });
    }
}

// Update user profile (name and profile image)
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, profileImageUrl } = req.body;
        const userId = req.user.id;

        // Find user and update profile
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if provided
        if (fullName) user.fullName = fullName;
        if (profileImageUrl) user.profileImageUrl = profileImageUrl;

        await user.save();

        // Return updated user without password
        const updatedUser = await User.findById(userId).select("-password");

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
}

// Change user password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        // Find user with password
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordCorrect) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Update password (will be hashed by pre-save middleware)
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        });
    } catch (err) {
        res.status(500).json({ message: "Error changing password", error: err.message });
    }
}

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const userId = req.user.id;
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // Update user profile with new image URL
        const user = await User.findByIdAndUpdate(
            userId,
            { profileImageUrl: imageUrl },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile image uploaded successfully",
            user: user,
            imageUrl: imageUrl
        });
    } catch (err) {
        res.status(500).json({ message: "Error uploading image", error: err.message });
    }
}