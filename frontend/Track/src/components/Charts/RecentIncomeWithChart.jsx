import React, { useEffect, useState } from 'react'
import CustomPieChart from './CustomPieChart'

const COLORS = ["#875cf5", "#fa2c37", "#ff6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    console.log("RecentIncomeWithChart received:", data, "totalIncome:", totalIncome);

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }))
        setChartData(dataArr);
    }

    useEffect(() => {
        prepareChartData();
        return () => { };
    }, [data])

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>

            {chartData && chartData.length > 0 ? (
                <CustomPieChart
                    data={chartData}
                    label="Total Income"
                    totalAmount={`$${totalIncome}`}
                    showTextAnchor
                    colors={COLORS}
                />
            ) : (
                <div className="text-center text-gray-500 py-16">
                    <p>No income data available for the last 60 days</p>
                </div>
            )}
        </div>
    )
}

export default RecentIncomeWithChart
