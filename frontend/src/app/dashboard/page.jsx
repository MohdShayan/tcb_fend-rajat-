"use client"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

import Card, { CardContent } from "../components/Card";
import BarChart from "../components/BarChart";
import SalesCard from "../components/SalesCard";
import ToggleButton from "../components/_components/Toggle";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../components/context/Expensecontext";
import axios from "axios";


const cardData = [
  {
    label: "Current Balance",
    amount: "45,231.89",
    // discription: "+20.1% from last month",
    icon: DollarSign
  },
  {
    label: "Future Expenses",
    amount: "+2350",
    // discription: "+180.1% from last month",
    icon: Users
  },
  {
    label: "Money Spend",
    amount: "+12,234",
    // discription: "+19% from last month",
    icon: CreditCard
  },
  {
    label: "Deficit",
    amount: "+573",
    // discription: "+201 since last hour",
    icon: Activity
  }
];
const sampleExpenses = [
  {
    title: "Groceries",
    amount: "+120",
    category: "Food",
    date: "2025-01-01",
  },
  {
    title: "Electricity Bill",
    amount: "+75",
    category: "Utilities",
    date: "2024-12-30",
  },
  {
    title: "Gym Membership",
    amount: "+50",
    category: "Health",
    date: "2024-12-28",
  },
];



export default function Dashboard() {

  const [expData, setExpData] = useState([]);

  
  const {expense,setExpense}=useContext(ExpenseContext)

  useEffect(() => {
    const getRecentExpList = async () => {
      try {
        const response = await axios.get("http://localhost:3001/expense", {
          withCredentials: true,
        });
  
        console.log("Recent expenses:", response.data); // Check the response data
        if (Array.isArray(response.data)) {
          setExpData(response.data);
          console.log(expData); // Store the response in `expData`
        } else {
          console.error("Response is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch recent expenses:", error);
      }
    };
  
    getRecentExpList(); // Fetch data on component mount
  }, []);

  useEffect(() => {
    console.log("Updated expData:", expData);
  }, [expData]);
  
  
  return (
    <div className="flex flex-col gap-5  w-full">
     <div className="flex justify-between">
      <h1 className="text-2xl font-semibold">DashBoard</h1>
      <ToggleButton/>
     </div>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>

          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-4">


          <section>
            <p>Recent Expenses</p>
          
          </section>
          {expData.map((data, index) => (
            <SalesCard
              key={index}
              title={data.title}
              category={data.category}
              saleAmount={data.amount}
            />
          ))}
          {
            expense.map((d, i) => (
              <SalesCard
                key={i}
                title={d.title}
                category={d.category}
                saleAmount={d.amount}
              />
            ))
          }
        </CardContent>

      </section>
    </div>
  );
}