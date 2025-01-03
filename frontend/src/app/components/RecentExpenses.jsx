"use client"
import React from "react";

const RecentExpenses = () => {
  const sampleExpenses = [
    {
      title: "Groceries",
      amount: 120,
      category: "Food",
      date: "2025-01-01",
    },
    {
      title: "Electricity Bill",
      amount: 75,
      category: "Utilities",
      date: "2024-12-30",
    },
    {
      title: "Gym Membership",
      amount: 50,
      category: "Health",
      date: "2024-12-28",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Recent Expenses</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Title</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Amount</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Category</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {sampleExpenses.map((expense, index) => (
            <tr
              key={index}
              className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">{expense.title}</td>
              <td className="px-6 py-4 text-sm text-gray-800">${expense.amount}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{expense.category}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {new Date(expense.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentExpenses;
