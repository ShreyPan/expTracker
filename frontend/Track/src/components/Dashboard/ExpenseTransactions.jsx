import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    console.log("ExpenseTransactions received:", transactions);
    console.log("ExpenseTransactions type:", typeof transactions);
    console.log("ExpenseTransactions length:", transactions?.length);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expenses</h5>

                <button
                    className="card-btn"
                    onClick={onSeeMore} >
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {transactions && transactions.length > 0 ? (
                    transactions.slice(0, 5).map((expense) => (
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date).format("MMM dd, yyyy")}
                            amount={expense.amount}
                            type="expense"
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>No expenses found for the last 30 days</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ExpenseTransactions
