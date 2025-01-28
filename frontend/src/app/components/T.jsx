"use client";
import React, { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode'; // Path to the `DarkModeSwitch` component from your code

function T() {
  const [toggle, setToggle] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : false;
  });

  useEffect(() => {
    if (toggle === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [toggle]);

  const handleToggle = (checked) => {
    setToggle(checked ? "dark" : "light");
  };

  return (
    <div>
      <span>
        {toggle === "dark" ? (
          <DarkModeSwitch
            checked={true}
            onChange={handleToggle}
            size={30} 
            moonColor="#fff"
            sunColor="#000" 
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <DarkModeSwitch
            checked={false}
            onChange={handleToggle}
            size={30}
            moonColor="#fff"
            sunColor="#000"
            style={{ cursor: 'pointer' }}
          />
        )}
      </span>
    </div>
  );
}

export default T;
