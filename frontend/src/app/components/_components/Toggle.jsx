
"use client";
import React, { useEffect } from 'react'
import { useTheme } from "next-themes";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import T from '../T';


const ToggleButton = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    // const currentTheme = theme === 'system' ? systemTheme : theme;
    const [isDarkMode, setDarkMode] = React.useState(theme=="dark"?true:false);
    useEffect(()=>{
        setDarkMode(theme=="dark"?true:false);
    })
    return (
      
        // <DarkModeSwitch>
            <T/>
        // </DarkModeSwitch>
    )
}

export default ToggleButton