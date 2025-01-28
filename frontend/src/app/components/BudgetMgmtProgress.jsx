// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { toast } from "sonner";

// const BudgetMgmtProgress = () => {
//   const [userId, setUserId] = useState(null);
//   const [progressData, setProgressData] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const router = useRouter();

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/auth/me", {
//           withCredentials: true,
//         });
//         setUserId(response.data.id);
//       } catch (error) {
//         console.error("Failed to fetch user ID:", error);
//         toast.error("Failed to authenticate. Redirecting to login...");
//         router.push("/login");
//       }
//     };

//     fetchUserId();
//   }, [router]);

//   useEffect(() => {
//     if (!userId || !selectedMonth) return;

//     const getBudgetProgress = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:3001/all-monthly-budget",
//           { userId },
//           { withCredentials: true }
//         );

//         if (response.data && Array.isArray(response.data)) {
//           // Filter data based on the selected month
//           const filteredData = response.data.filter(
//             (item) => item.month === selectedMonth
//           );
//           setProgressData(filteredData);
//         } else {
//           setProgressData([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch budget progress:", error);
//         toast.error("Failed to fetch budget progress.");
//       }
//     };

//     getBudgetProgress();
//   }, [userId, selectedMonth]);

//   const progressPercent = (spent, limit) => {
//     if (!spent || !limit || limit === 0) return 0;
//     return Math.floor(Math.min((spent / limit) * 100, 100));
//   };

//   const defaultCategories = [
//     "Entertainment",
//     "Bills",
//     "Grocery/Food",
//     "Transport",
//     "Clothing",
//     "Utilities",
//     "Miscellaneous",
//   ];

//   // Get the most recent entry for each category
//   const mostRecentData = progressData.reduce((acc, curr) => {
//     if (!acc[curr.category] || new Date(acc[curr.category].createdAt) < new Date(curr.createdAt)) {
//       acc[curr.category] = curr;
//     }
//     return acc;
//   }, {});

//   const mergedData = defaultCategories.map((category) => {
//     const existingData = mostRecentData[category];
//     return existingData
//       ? existingData
//       : { category, spent: 0, limit: 0, amount: 0, month: selectedMonth || "N/A" };
//   });

//   return (
//     <div>
//       <h1 className="text-xl text-center">Budget Progress</h1>
//       <div>
//         <div>
//           <label htmlFor="month" className="block mb-1">
//             Choose month:
//           </label>
//           <select
//             id="month"
//             name="month"
//             required
//             className="border rounded border-black dark:border-white w-full p-2"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//           >
//             <option value="" disabled>
//               Select month
//             </option>
//             {months.map((month, index) => (
//               <option key={index} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </div>

//         {mergedData.length > 0 ? (
//           mergedData.map((data) => (
//             <div className="mt-5" key={data.category}>
//               <div className="flex justify-between">
//                 <p>{data.category}</p>
//                 <p>
//                   {data.spent || 0}/{data.limit || 0}
//                 </p>
//               </div>
//               <div className="w-full h-2 bg-white rounded border border-zinc-800 dark:bg-zinc-800">
//                 <div
//                   className="h-2 rounded bg-zinc-800 dark:bg-white"
//                   style={{ width: `${progressPercent(data.spent, data.limit)}%` }}
//                 ></div>
//               </div>
//               <p>{progressPercent(data.spent, data.limit)}% of budget used</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center mt-5">No budget data available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BudgetMgmtProgress;






"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const BudgetMgmtProgress = () => {
  const [userId, setUserId] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/me", {
          withCredentials: true,
        });
        setUserId(response.data.id);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
        toast.error("Failed to authenticate. Redirecting to login...");
        router.push("/login");
      }
    };

    fetchUserId();
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/expense`, {
          withCredentials: true,
        });
        console.log("response.data", response.data);
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
        toast.error("Failed to fetch expenses.");
      }
    };

    fetchExpenses();
  }, [userId]);

  useEffect(() => {
    if (!userId || !selectedMonth) return;

    const getBudgetProgress = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/all-monthly-budget",
          { userId },
          { withCredentials: true }
        );

        if (response.data && Array.isArray(response.data)) {
          const filteredData = response.data.filter(
            (item) => item.month === selectedMonth
          );
          setProgressData(filteredData);
        } else {
          setProgressData([]);
        }
      } catch (error) {
        console.error("Failed to fetch budget progress:", error);
        toast.error("Failed to fetch budget progress.");
      }
    };

    getBudgetProgress();
  }, [userId, selectedMonth]);

  const progressPercent = (spent, limit) => {
    if (!spent || !limit || limit === 0) return 0;
    return Math.floor(Math.min((spent / limit) * 100, 100));
  };

  const defaultCategories = [
    "Entertainment", "Bills", "Grocery/Food", "Transport",
    "Clothing", "Utilities", "Miscellaneous"
  ];

  
  const filterExpensesByMonth = (expenses, selectedMonth) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseMonth = months[expenseDate.getMonth()];
      return expenseMonth === selectedMonth;
    });
  };

  
  const calculateTotalExpensesByCategory = (expenses, selectedMonth) => {
    const filteredExpenses = filterExpensesByMonth(expenses, selectedMonth);
    return filteredExpenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});
  };

  
  const mostRecentData = progressData.reduce((acc, curr) => {
    if (!acc[curr.category] || new Date(acc[curr.category].createdAt) < new Date(curr.createdAt)) {
      acc[curr.category] = curr;
    }
    return acc;
  }, {});

  
  const mergedData = defaultCategories.map((category) => {
    const existingData = mostRecentData[category];
    const totalSpent = calculateTotalExpensesByCategory(expenses, selectedMonth)[category] || 0;
    return existingData
      ? { ...existingData, spent: totalSpent }
      : { category, spent: totalSpent, limit: 0, amount: 0, month: selectedMonth || "N/A" };
  });

  return (
    <div>
      <h1 className="text-xl text-center">Budget Progress</h1>
      <div>
        <div>
          <label htmlFor="month" className="block mb-1">
            Choose month:
          </label>
          <select
            id="month"
            name="month"
            required
            className="border rounded border-black dark:border-white w-full p-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="" disabled>
              Select month
            </option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {mergedData.length > 0 ? (
          mergedData.map((data) => (
            <div className="mt-5" key={data.category}>
              <div className="flex justify-between">
                <p>{data.category}</p>
                <p>
                  {data.spent || 0}/{data.limit || 0}
                </p>
              </div>
              <div className="w-full h-2 bg-white rounded border border-zinc-800 dark:bg-zinc-800">
                <div
                  className="h-2 rounded bg-zinc-800 dark:bg-white"
                  style={{ width: `${progressPercent(data.spent, data.limit)}%` }}
                ></div>
              </div>
              <p>{progressPercent(data.spent, data.limit)}% of budget used</p>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No budget data available.</p>
        )}
      </div>
    </div>
  );
};

export default BudgetMgmtProgress;