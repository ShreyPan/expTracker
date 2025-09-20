import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {
    console.log("Last30DaysExpenses received:", data);

    const [charData, setCharData] = useState(data);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setCharData(result);

        return () => { };
    }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            {charData && charData.length > 0 ? (
                <CustomBarChart data={charData} />
            ) : (
                <div className="text-center text-gray-500 py-16">
                    <p>No expense data available for the last 30 days</p>
                </div>
            )}
        </div>
    )
}

export default Last30DaysExpenses
