import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'


const RecentTransactions = ({ transactions, onSeeMore }) => {
    console.log("Recent Transactions: ", transactions);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Recent Transactions</h5>

                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className="mt-6">
                {transactions && transactions.length > 0 ? (
                    transactions.slice(0, 5).map((item) => (
                        <TransactionInfoCard
                            key={item._id}
                            title={item.type == 'expense' ? item.category : item.source}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={item.type || (item.source ? "income" : "expense")}
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>No recent transactions found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecentTransactions
