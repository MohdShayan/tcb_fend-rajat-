"use client";
import {useState} from "react";
import ToggleButton from "../components/_components/Toggle";

const Report=()=>{
    const trendData = [
        {
            category: "Food",
            change: 15,
            isIncrease: true
        },
        {
            category: "Transport",
            change: 10,
            isIncrease: false
        },
        {
            category: "Clothing",
            change: 0,
            isIncrease: false
        },
        {
            category: "Miscellaneous",
            change: 20,
            isIncrease: false
        }
    ];

    const[month, setMonth] = useState("");
    const months = ["January", "February","March", "April","May","June", "July","August", "September", "August", "October", "November","December"];

    return(
        <div>
            <div className="flex justify-between">
                <h1 className="text-4xl">Reports & Analysis</h1>
                <div className="flex gap-2">
                    <ToggleButton/>
                    <button className="text-sm border border-black p-2 rounded text-center dark:border-white">Export CSV</button>
                    <button className="text-sm border border-black p-2 rounded text-center dark:border-white">Import CSV</button>
                </div>
            </div>
            <p className="text-md mt-4">View detailed reports and export your data</p>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2">
                <div className="mr-5">
                    <h2 className="text-xl mb-2">Spending Trends</h2>
                    {trendData.map((trend)=>(
                        <div className="text-sm flex justify-between rounded border border-black dark:bg-zinc-900 p-2 mb-2">
                            <div>
                                {trend.category}
                                {trend.isIncrease && <p>{trend.change}% increase from last month</p>}
                                {!trend.isIncrease && <p>{trend.change}% decrease from last month</p>}
                            </div>
                            <div className="flex flex-col justify-center">
                                {trend.isIncrease && <p className="text-red-500">{trend.change}%</p>}
                                {!trend.isIncrease && <p className="text-green-500">{trend.change}%</p>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex h-10">
                    <select value={month}
                        onChange={(e)=>setMonth(e.target.value)}
                        className="p-2 rounded border border-black dark:border-white text-sm">
                    <option value="" disabled>Select month</option>
                        {months.map((month, index)=>(
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                    <button className="ml-2 p-2 rounded border border-black dark:border-white text-sm">Generate Report</button>
                </div>
            </div>
        </div>
    );
}

export default Report;