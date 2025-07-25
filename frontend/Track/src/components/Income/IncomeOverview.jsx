import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../../components/Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions = [], onAddIncome }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log("Transactions in IncomeOverview:", transactions);

        const safeTransactions = Array.isArray(transactions) ? transactions : [];
        const result = prepareIncomeBarChartData(transactions);
        console.log("Prepared Chart Data:", result);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income
                    </p>
                </div>
                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>
            <div className="mt-10">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview
