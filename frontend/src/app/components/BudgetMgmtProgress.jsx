"use client";

const BudgetMgmtProgress=()=>{
    const progressData = [
        {
            category: "Entertainment",
            spent: 1000,
            limit: 1500,
        },
        {
            category: "Food",
            spent: 1200,
            limit: 1500,
        },
        {
            category: "Transport",
            spent: 800,
            limit: 1500,
        },
        {
            category: "Clothing",
            spent: 500,
            limit: 1500,
        },
        {
            category: "Miscellaneous",
            spent: 1000,
            limit: 1500,
        }
    ]

    const progressPercent=(spent, limit)=>{
        return Math.floor(Math.min((spent/limit)*100, 100));
    }

    return(
        <div>
            <h1 className="text-xl text-center">Budget Progress</h1>
            <div>
                {progressData.map((data)=>(
                    <div className="mt-5" key={data.category}>
                        <div className="flex justify-between">
                            <p>{data.category}</p>
                            <p>{data.spent}/{data.limit}</p>
                        </div>
                        <div className="w-full h-2 bg-white rounded border border-zinc-800 dark:bg-zinc-800">
                            <div className="h-2 rounded bg-zinc-800 dark:bg-white" style={{width: `${progressPercent(data.spent, data.limit)}%`}}></div>
                        </div>
                        <p>{progressPercent(data.spent, data.limit)}% of budget used</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BudgetMgmtProgress;