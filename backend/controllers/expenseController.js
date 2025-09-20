const User = require("../models/User");
const Expense = require("../models/Expense");


exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense(
            {
                userId,
                icon,
                category,
                amount,
                date: new Date(date)
            }
        )

        await newExpense.save();
        res.status(200).json(newExpense);

    } catch (error) {
        console.error("Error adding expense:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        }
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        // Add pagination support
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Add filtering support
        let query = { userId };

        if (req.query.category) {
            query.category = { $regex: req.query.category, $options: 'i' };
        }

        if (req.query.dateFrom || req.query.dateTo) {
            query.date = {};
            if (req.query.dateFrom) query.date.$gte = new Date(req.query.dateFrom);
            if (req.query.dateTo) query.date.$lte = new Date(req.query.dateTo);
        }

        if (req.query.amountMin || req.query.amountMax) {
            query.amount = {};
            if (req.query.amountMin) query.amount.$gte = parseFloat(req.query.amountMin);
            if (req.query.amountMax) query.amount.$lte = parseFloat(req.query.amountMax);
        }

        const expenses = await Expense.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Expense.countDocuments(query);

        res.json({
            expenses,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
