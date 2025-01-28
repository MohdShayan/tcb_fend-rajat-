"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ToggleButton from "../../components/_components/Toggle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ExpenseForm = () => {
  const router = useRouter();
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user ID when component is mounted
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/me", {
          withCredentials: true,
        });
        console.log("User ID:", response.data.id);
        setUserId(response.data.id);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
        window.alert("Failed to authenticate. Redirecting to login...");
        router.push("/login");
      }
    };

    fetchUserId();
  }, [router]);

  // Handle changes to the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expenseData.title || !expenseData.amount || !expenseData.category || !expenseData.date) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/expense",
        { ...expenseData, userId }, // Include userId separately
        { withCredentials: true }
      );
      console.log("Expense added:", response.data);

      // Show success toast notification
      toast.success("Expense Added Successfully!");
      setError(""); 
      router.push("/dashboard"); // Redirect to dashboard after submission
    } catch (error) {
      console.error("Failed to submit expense:", error);
      setError("Failed to submit the expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Expenses</h1>
        <ToggleButton />
      </div>
      <div className="p-6 m-5 bg-white dark:bg-[#2b2a2a] shadow-lg rounded-lg">
        <h1 className="text-3xl dark:text-zinc-100 font-semibold text-center mb-6">
          Expense Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-white font-medium">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={expenseData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block dark:text-white text-gray-700 font-medium">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              value={expenseData.amount}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block dark:text-white text-gray-700 font-medium">
              Category:
            </label>
            <select
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              <option value="">Select a category</option>
              <option value="bills">Bills</option>
              <option value="food">Grocery/Food</option>
              <option value="transport">Transport</option>
              <option value="clothing">Clothing</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block dark:text-white text-gray-700 font-medium">
              Date:
            </label>
            <input
              type="date"
              name="date"
              value={expenseData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end">
            <Button
              className="hover:bg-indigo-500 hover:text-white hover:font-bold"
              disabled={loading || !userId} // Disable submit if loading or userId is missing
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
