'use client'
import { validateRequest } from '@/actions/auth';
import { Button } from '../ui/button';
import { useTheme } from "next-themes"
import Link from 'next/link';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useEffect, useState } from 'react';


export default function Header() {
  const [user, setUser] = useState<any | null>(null)
  const { resolvedTheme, setTheme } = useTheme()

  const checkUserValidation = async () => {
    const { user } = await validateRequest()
    if(user) {
      setUser(user)
    }
    console.log(user)
  }

  useEffect(() => {
    checkUserValidation()
  }, [])

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
          { !user && (
            <Link href="/signin">
              <Button variant="brand">
                Sign In
              </Button>
            </Link>   
          )}
          { user && (
            <Link href="/signin">
              <Button variant="brand">
                Sign Out
              </Button>
            </Link>
          )}
          <Button variant="brand" onClick={() => toggleTheme()}>
            {resolvedTheme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </Button>
        </ul>
      </div>
      
      
    </header>
  )
}