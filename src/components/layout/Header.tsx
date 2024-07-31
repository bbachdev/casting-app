'use client'
import { Button } from '../ui/button';
import { useTheme } from "next-themes"
import Link from 'next/link';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";


export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme((resolvedTheme === "dark" ? "light" : "dark"))
  }

  return (
    <header className={`w-full flex py-4 px-6 bg-sky-900 shadow-md`}>
      <div className={`flex max-w-[1440px] w-full mx-auto`}>
        <ul className={`flex my-auto text-white`}>
          <Link href="/">Home</Link>
        </ul>
        <ul className={`ml-auto flex my-auto gap-4`}>
          <Link href="/signin">
            <Button variant="brand">
              Sign In
            </Button>
          </Link>    
          <Button variant="brand" onClick={() => toggleTheme()}>
            {resolvedTheme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </Button>
        </ul>
      </div>
      
      
    </header>
  )
}