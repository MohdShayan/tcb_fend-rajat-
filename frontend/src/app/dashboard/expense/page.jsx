"use client";

import { useContext, useState } from "react";
//import { useRouter } from "next/navigation";
import ToggleButton from "../../components/_components/Toggle";
import { Button } from "@/components/ui/button";
import { ExpenseContext } from "../../components/context/Expensecontext";
import { toast } from "sonner";

const ExpenseForm = () => {
  //const router = useRouter();
  const [expenseD, setExpenseD] = useState();
  const {expense,setExpense}=useContext(ExpenseContext)
  console.log(expense);
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseD((prevState) => ({
      ...prevState,
      [name]: value,  
    }));
    console.log(expense);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expenseD.title || !expenseD.amount || !expenseD.category || !expenseD.date) {
      setError("All fields are required.");
      return;
    }

    try {
    //   const response = await axios.post("/api/expense", expense, {
    //     withCredentials: true,
    //   });

      //console.log(response.data);
      setExpense(prev=>[...prev,expenseD]);
      toast("Expense Added Successfully!!!")
      console.log(expense);
      
      setError("");
    
    } catch (error) {
      console.log(error);
      setError("Failed to submit the expense.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto ">
    <div className="flex justify-between">
    <h1 className="text-2xl font-semibold">Expenses</h1>
    <ToggleButton/>
   </div>
    <div className="p-6 m-5 bg-white dark:bg-[#2b2a2a] shadow-lg rounded-lg">
       
      <h1 className="text-3xl dark:text-zinc-500  font-semibold text-center mb-6">Expense Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-white font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={expenseD?.title}
            onChange={handleChange}
            required
            className="w-full p-3 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block dark:text-white text-gray-700 font-medium">Amount:</label>
          <input
            type="number"
            name="amount"
            value={expenseD?.amount}
            onChange={handleChange}
            required
            className="w-full p-3 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block dark:text-white text-gray-700 font-medium">Category:</label>
          <input
            type="text"
            name="category"
            value={expenseD?.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block dark:text-white text-gray-700 font-medium">Date:</label>
          <input
            type="date"
            name="date"
            value={expenseD?.date}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          Submit
        </button> */}
       <div className="flex justify-end ">
       <Button className="hover:bg-indigo-500 hover:text-white hover:font-bold">
          Submit
        </Button>
       </div>
      </form>
    </div>
    </div>
  );
};

export default ExpenseForm;
