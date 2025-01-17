"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Email:", loginData.email);
    console.log("Password:", loginData.password);

    // Basic validation (optional but recommended)
    if (!loginData.email || !loginData.password) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      // const response = await axios.post(
      //   "http://localhost:3000/user/login",
      //   loginData,
      //   { withCredentials: true }
      // );
      // console.log(response);
      // setMessage("Login successful!");
      router.push("/pages/dashboard"); // Using Next.js router for navigation
    } catch (error) {
      console.log(error);
      setMessage("Login failed. Please try again.");
    } finally {
      setLoginData({ email: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white border rounded shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center dark:text-black">Login</h2>
        <div className="mb-4 dark:text-black">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-black focus:ring-2 dark:bg-white"
          />
        </div>
        <div className="mb-6 dark:text-black">
          <label htmlFor="password" className="block mb-2 text-sm font-medium ">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-black focus:ring-2 dark:bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-gray-900 rounded"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Page;
