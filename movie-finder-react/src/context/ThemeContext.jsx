import { createContext , useContext, useEffect, useState } from "react";

const ThemeContext = createContext()

export function useTheme(){
    return useContext(ThemeContext);
}

export function ThemeProvider({children}){
    const storedtheme = localStorage.getItem('theme') || '';
    const [theme , setTheme] = useState(storedtheme);
    
    

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === '' ? 'light' : ''));
    }

    useEffect(() => {
      localStorage.setItem('theme' , theme);
    } , [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
}