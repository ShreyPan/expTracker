const express = require("express");
const { addIncome, getAllIncome, deleteIncome } = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");
const { validateIncome } = require("../middleware/validation");

const router = express.Router();

router.post("/add", protect, validateIncome, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
