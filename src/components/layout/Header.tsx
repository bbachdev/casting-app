'use client'
import { Button } from '../ui/button';
import { useTheme } from "next-themes"
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";


export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme((resolvedTheme === "dark" ? "light" : "dark"))
  }

  return (
    <header className={`w-full flex py-4 px-6 bg-sky-900 shadow-md dark:bg-sky-500`}>
      {/* <header className={`w-full flex flex-row py-4 px-6 bg-transparent text-white`}> */}
      <ul className={`ml-auto flex justify-center gap-4`}>
        <Button variant="outline">
          Sign In
        </Button>
        <Button variant="outline" onClick={() => toggleTheme()}>
          {resolvedTheme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </Button>
      </ul>
      
    </header>
  )
}