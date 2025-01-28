"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BudgetMgmtForm = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    month: "",
    category: "",
    limit: "",
  });
  const [err, setErr] = useState({
    month: "",
    category: "",
    limit: "",
  });

  const categories = [
    "Entertainment",
    "Bills",
    "Grocery/Food",
    "Transport",
    "Clothing",
    "Utilities",
    "Miscellaneous",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Fetch user ID
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

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const validateForm = () => {
    let isValid = true;
    let newErrors = { category: "", limit: "" , month: ""};

    if (!formData.category) {
      newErrors.category = "Select a category";
      isValid = false;
    }
    if (!formData.month) {
      newErrors.month = "Select a month";
      isValid = false;
    }

    if (!formData.limit) {
      newErrors.limit = "Amount is required";
      isValid = false;
    } else if (parseFloat(formData.limit) <= 0) {
      newErrors.limit = "Amount should be positive";
      isValid = false;
    }

    setErr(newErrors);
    return isValid;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm() || !userId) return;

  try {
    const response = await axios.post(
      "http://localhost:3001/monthly-budget",
      {
        userId,
        ...formData,
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      toast.success(`Budget for ${formData.category} in ${formData.month} set to $${formData.limit}!`);
      setFormData({ category: "", limit: "", month: "" });
      setErr({ category: "", limit: "", month: "" });
    }
  } catch (error) {
    console.error("Failed to set budget plan:", error);
    toast.error("Failed to set budget. Please try again.");
  }
};


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-xl text-center font-bold">Set Monthly Budget</h1>

      <div>
        <label htmlFor="month" className="block mb-1">
          Choose month:
        </label>
        <select
          id="month"
          name="month"
          value={formData.month}
          onChange={handleChange}
          required
          className="border rounded border-black dark:border-white w-full p-2"
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
        {err.month && <p className="text-red-500 mt-1">{err.month}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block mb-1">
          Choose category:
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border rounded border-black dark:border-white w-full p-2"
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {err.category && <p className="text-red-500 mt-1">{err.category}</p>}
      </div>

      <div>
        <label htmlFor="limit" className="block mb-1">
          Amount:
        </label>
        <input
          type="number"
          id="limit"
          name="limit"
          value={formData.limit}
          onChange={handleChange}
          placeholder="Enter budget"
          required
          className="border placeholder-black dark:placeholder-white border-black rounded dark:border-white p-2 w-full"
        />
        {err.limit && <p className="text-red-500 mt-1">{err.limit}</p>}
      </div>

      <button
        type="submit"
        className="p-2 bg-black text-white dark:bg-white rounded dark:text-black mt-4"
      >
        Set Budget Plan
      </button>
    </form>
  );
};

export default BudgetMgmtForm;