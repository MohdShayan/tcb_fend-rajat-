// import RecentExpenses from "@/app/components/RecentExpenses";
// import Link from "next/link"; 

// export default function Page() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
//       <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">
//         Welcome to Expense Tracker
//       </h1>

//       <p className="text-lg text-center text-gray-600 mb-6">
//         Track your expenses, set budgets, and gain insights into your spending!
//       </p>

//       <div className="flex flex-col space-y-4">
//         <Link
//           href="/pages/signup"
//           className="w-full py-3 text-white bg-blue-500 rounded-lg text-center hover:bg-blue-600 transition duration-300"
//         >
//           Sign Up
//         </Link>

//         <Link
//           href="/pages/login"
//           className="w-full py-3 text-white bg-green-500 rounded-lg text-center hover:bg-green-600 transition duration-300"
//         >
//           Login
//         </Link>
        
//       </div>
//     </div>
//   );
// }
"use client";
import { SparklesCore } from "../components/ui/sparkles";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
 
const words = `Track Your Expenses with Ease
`;
import Link from "next/link";

export default function LandingPage() {
  return (
    // <div className="min-h-screen bg-gray-100 flex flex-col">
     
    //   <main className="flex-grow container mx-auto px-4 py-16 text-center">
    //     <h1 className="text-4xl font-bold mb-4 text-zinc-700">
        
    //       <TextGenerateEffect duration={2} filter={false} words={words} className={"text-black"} />

    //     </h1>
    //     <p className="text-lg text-gray-700 mb-6">
    //       Monitor your spending, set budgets, and stay on top of your finances
    //       with our user-friendly expense tracker.
    //     </p>
    //     <div className="space-x-4">
          
    //       <Link href="/signup">
    //         <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700">
    //           Signup
    //         </button>
    //       </Link>
    //       <Link href="/login">
    //         <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700">
    //           Login
    //         </button>
    //       </Link>
    //     </div>
    //   </main>

    //   {/* Footer */}
    //   <footer className="bg-gray-800 text-gray-400 py-6">
    //     <div className="container mx-auto px-4 text-center">
    //       <p>© 2025 Expense Tracker. All rights reserved.</p>
    //     </div>
    //   </footer>
    // </div>


    <div className="h-screen relative w-full bg-black flex flex-col overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white ">
      <TextGenerateEffect duration={2} filter={false} words={words}  />
      </h1>
    </div>
  );
}
