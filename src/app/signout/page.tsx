'use client'
import { signOut } from '@/actions/auth';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function SignOut() {
  const router = useRouter()

  useEffect (() => {
    async function signOutUser() {
      const res = await signOut();
      
      //If user wasn't signed in anyway, redirect from here
      if(res && res.status === 401) {
        router.push('/signin')
      }
    }
    signOutUser();
  }, [])

  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <ClipLoader className={`w-full flex`} color={'#fff'} loading={true} size={25} />
    </div>
  )
}
