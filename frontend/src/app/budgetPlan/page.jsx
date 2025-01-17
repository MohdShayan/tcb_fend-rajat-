"use client";

import BudgetMgmtForm from '../components/BudgetMgmtForm';
import BudgetMgmtProgress from '../components/BudgetMgmtProgress';
import ToggleButton from '../components/_components/Toggle';

const BudgetManagement=()=>{
    return(
        <div>
            <div className='text-4xl flex justify-between'>
                <h1>Budget Management</h1>
                <ToggleButton/>
            </div>
            
            <p className='text-md mt-5'>Set and track your monthly budgets by category</p>
            
            <div className='grid grid-cols-1 gap-10 mt-10 sm:grid-cols-2'>
                <div className='border border-black dark:border-white p-5'><BudgetMgmtForm/></div>
                <div className='border border-black dark:border-white p-5'><BudgetMgmtProgress/></div>
            </div>
        </div>
    )
}

export default BudgetManagement;