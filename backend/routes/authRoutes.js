const express = require("express");
const upload = require("../middleware/uploadMiddleware")
const { protect } = require("../middleware/authMiddleware");
const { validateRegister, validateLogin, validateUpdateProfile, validateChangePassword } = require("../middleware/validation");
const {
    registerUser,
    loginUser,
    getUserInfo,
    refreshToken,
    updateProfile,
    changePassword,
    uploadProfileImage
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

router.get("/getUser", protect, getUserInfo);

router.post("/refresh-token", refreshToken);

// Profile management routes
router.put("/update-profile", protect, validateUpdateProfile, updateProfile);

router.put("/change-password", protect, validateChangePassword, changePassword);

router.post("/upload-profile-image", protect, upload.single("image"), uploadProfileImage);

// Legacy upload image route (keep for backward compatibility)
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
})

module.exports = router;

