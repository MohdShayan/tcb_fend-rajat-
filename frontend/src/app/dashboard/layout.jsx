"use client"
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ExpenseContext } from '../components/context/Expensecontext'

function layout({children}) {
    const [expense, setExpense] = useState
    ([]);
  return (
    
    // <div className='min-h-screen w-full dark:text-white dark:bg-black  bg-white text-black flex'>
    //        {/* <p className='border'>Sidebar</p> */}
    //        {/* <Sidebar/> */}
    //        <div className='p-8 w-full '>
    //        {children}
    //        </div>
    // </div>
     <div>
         <ExpenseContext.Provider value={{expense,setExpense}}>
    <div>
        {children}
    </div>
     </ExpenseContext.Provider>
     </div>
  )
}

export default layout