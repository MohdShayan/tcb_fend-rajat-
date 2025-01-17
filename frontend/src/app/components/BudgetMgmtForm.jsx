"use client";

import { useState } from "react";

const BudgetMgmtForm =()=>{
    const [formData, setFormData] = useState({
        category: "",
        budget: ""
    });
    const [err, setErr] = useState({
        category:"",
        budget:""
    });

    const categories = ["Entertainment", "Bills", "Grocery/Food", "Transport", "Clothing", "Miscellaneous"];

    const handleChange=(e)=>{
        const{name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const isValid = validateForm();
        if(isValid){
            console.log(formData);
        }
    };

    const validateForm=(e)=>{
        let isValid = true;
        let newErrors={};
        if(!formData.category){
            newErrors.category="Select category";
            isValid=false;
        }
        if(!formData.budget){
            newErrors.budget = "Budget is required";
            isValid=false;
        }
        else if(formData.budget<0){
            newErrors.budget="Budget should be positive";
            isValid=false;
        }

        setErr(newErrors);
        return isValid;
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h1 className="text-xl text-center">Set Monthly Budget</h1>
            <div>
                <label htmlFor="category">Choose category:</label>
                <select id="category" name="category" 
                value={formData.category} onChange={handleChange} required
                className="border rounded border-black dark:border-white w-full p-2">
                    <option value="" disabled>Select category</option>
                    {categories.map((category,index)=>(
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {err.category && <p className="text-red-500">{err.category}</p>}
            </div>
            <div>
                <label htmlFor="budget">Budget: </label>
                <input type="number" id="budget" name="budget" 
                value={formData.budget} onChange={handleChange} 
                placeholder="Enter budget" required
                className="border placeholder-black dark:placeholder-white border-black rounded dark:border-white p-2 w-full"></input>
                {err.budget && <p className="text-red-500">{err.budget}</p>}
            </div>
            <button type="submit" className="p-2 bg-black text-white dark:bg-white rounded dark:text-black">Set Budget Plan</button>
        </form>
    )
}

export default BudgetMgmtForm;
