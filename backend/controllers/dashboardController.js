const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");
const { Transaction } = require("mongodb");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Dashboard API called for user:", userId);
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get the most recent income transactions (up to 10) regardless of date
        const recentIncomeTransactions = await Income.find({ userId })
            .sort({ date: -1 })
            .limit(10);

        console.log("Recent income transactions count:", recentIncomeTransactions.length);

        // Calculate total for these transactions
        const incomeLast60Days = recentIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Get the most recent expense transactions (up to 10) regardless of date
        const recentExpenseTransactions = await Expense.find({ userId })
            .sort({ date: -1 })
            .limit(10);

        console.log("Recent expense transactions count:", recentExpenseTransactions.length);

        const expenseLast30Days = recentExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        const recentIncomeTxns = await Income.find({ userId }).sort({ date: -1 }).limit(5);
        const recentExpenseTxns = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

        console.log("Recent income transactions count:", recentIncomeTxns.length);
        console.log("Recent expense transactions count:", recentExpenseTxns.length);

        // Let's also check all income data to see dates
        const allIncome = await Income.find({ userId }).sort({ date: -1 });
        const allExpenses = await Expense.find({ userId }).sort({ date: -1 });
        console.log("Total income records:", allIncome.length);
        console.log("Total expense records:", allExpenses.length);
        if (allIncome.length > 0) {
            console.log("Newest income date:", allIncome[0].date);
            console.log("Oldest income date:", allIncome[allIncome.length - 1].date);
        }
        if (allExpenses.length > 0) {
            console.log("Newest expense date:", allExpenses[0].date);
            console.log("Oldest expense date:", allExpenses[allExpenses.length - 1].date);
        }

        const formattedIncomeTxns = recentIncomeTxns.map(txn => ({
            ...txn.toObject(),
            type: "income"
        }));

        const formattedExpenseTxns = recentExpenseTxns.map(txn => ({
            ...txn.toObject(),
            type: "expense"
        }));

        const lastTransactions = [...formattedIncomeTxns, ...formattedExpenseTxns]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: recentExpenseTransactions
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: recentIncomeTransactions,
            },
            recentTransactions: lastTransactions
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}
