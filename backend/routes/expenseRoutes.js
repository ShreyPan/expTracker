const express = require("express");
const { addExpense, getAllExpense, deleteExpense } = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");
const { validateExpense } = require("../middleware/validation");

const router = express.Router();

router.post("/add", protect, validateExpense, addExpense);
router.get("/get", protect, getAllExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;

