'use client'
import { validateRequest, signOut } from '@/actions/auth';
import { Button } from '../ui/button';
import { useTheme } from "next-themes"
import Link from 'next/link';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Header() {
  const [hasLoaded, setHasLoaded] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()

  const checkUserValidation = async () => {
    const { user } = await validateRequest()
    if(user) {
      setUser(user)
    }
    setHasLoaded(true)
  }

  useEffect(() => {
    checkUserValidation()
  }, [])

  function toggleTheme() {
    setTheme((resolvedTheme === "dark" ? "light" : "dark"))
  }

  async function attemptSignOut() {
    const response = await signOut()
    if(response.status === 200) {
      console.log('Successful logout')
      setUser(null)
      router.push('/')
    }else{
      console.log('Unsuccessful logout: ', response.body)
    }
  }

  return (
    <header className={`w-full flex py-4 px-6 bg-sky-900 shadow-md`}>
      <Suspense>
          <div className={`flex max-w-[1440px] w-full mx-auto`}>
          <ul className={`flex my-auto text-white`}>
            <Link href="/">Home</Link>
          </ul>
          <ul className={`ml-auto flex my-auto gap-4`}>
            { !user && hasLoaded && (
              <Link href="/signin">
                <Button variant="brand">
                  Sign In
                </Button>
              </Link>   
            )}
            { user && hasLoaded && (
              <Link href="/signin">
                <Button variant="brand" onClick={() => attemptSignOut()}>
                  Sign Out
                </Button>
              </Link>
            )}
            <Button variant="brand" onClick={() => toggleTheme()}>
              {resolvedTheme === "dark" ? <MdLightMode /> : <MdDarkMode />}
            </Button>
          </ul>
        </div>
      </Suspense>
    </header>
  )
}