import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='bg-[#1b1b1b] rounded-b-xl shadow-md'>
    <div className="container mx-auto px-4 py-5 flex justify-between  items-center">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <nav className="space-x-4">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </nav>
        </div>
        </div>
  )
}

export default Navbar