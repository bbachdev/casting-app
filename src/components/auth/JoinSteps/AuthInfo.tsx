'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { JoinSchema, joinSchemaAuthInfo } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { createUser } from '@/actions/users';
import ClipLoader from 'react-spinners/ClipLoader';

type AuthInfoProps = {
  userInfo: JoinSchema
  setUserInfo: Dispatch<SetStateAction<JoinSchema>>
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function AuthInfo({ userInfo, setUserInfo, setCurrentStep}: AuthInfoProps) {
  const [loading, startTransition] = useTransition()
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  const form = useForm<z.infer<typeof joinSchemaAuthInfo>>({
    resolver: zodResolver(joinSchemaAuthInfo),
    defaultValues: {
      displayName: userInfo.displayName || "",
      password: userInfo.password ||  "",
      passwordConfirm: userInfo.passwordConfirm ||  "",
    },
  })

  async function passwordChanged(event: FormEvent<HTMLInputElement>) {
    const password = event.currentTarget.value
    setPasswordRequirements({
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#\$%\^&\*]/.test(password),
    },)
  }

  async function onSubmit(data: z.infer<typeof joinSchemaAuthInfo>) {
    startTransition(async () => {
      setUserInfo((prev) => ({ ...prev, ...data }))

      console.log("User Info: ", userInfo)
    
      //Attempt to create user
      const res = await createUser(userInfo.email, userInfo.password, userInfo.displayName, userInfo.dateOfBirth!)
      if(res && res.status !== 201) {
        console.error("Error creating user: ", res)
        form.setError("root", {
          type: "userCreateError", message: res.response as string 
        })
      }
    })
  }

  function goBack() {
    setCurrentStep(0)
  }

  useEffect(() => {
    setPasswordRequirements({
      length: userInfo.password.length >= 12,
      uppercase: /[A-Z]/.test(userInfo.password),
      lowercase: /[a-z]/.test(userInfo.password),
      number: /\d/.test(userInfo.password),
      special: /[!@#\$%\^&\*]/.test(userInfo.password)
    })
  }, [])

  //Run setPasswordRequirements on initial load


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="displayName" render={({ field }) => (
          <FormItem>
            <FormLabel>Display Name</FormLabel>
            <FormControl>
              <Input {...field} type="displayName" />
            </FormControl>
            <FormDescription>
              This name will be visible to other users.
            </FormDescription>
          </FormItem>
        )}/>
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...field} type="password" onChangeCapture={(e) => passwordChanged(e)}/>
            </FormControl>
            <FormDescription>
              <p className={`font-semibold mb-2`}>Passwords must contain:</p>
              <ul className={`list-none pl-2 flex flex-col gap-1`}>
                <li className={`flex flex-row items-center`}>
                  { passwordRequirements.length ? <FaCheckCircle className={`text-xl mr-2 text-emerald-600/90`}/> : <FaCircleXmark className={`text-xl mr-2 text-destructive/90`}/> }
                  <span>At least 12 characters</span>
                </li>
                <li className={`flex flex-row items-center`}>
                  { passwordRequirements.uppercase ? <FaCheckCircle className={`text-xl mr-2 text-emerald-600/90`}/> : <FaCircleXmark className={`text-xl mr-2 text-destructive/90`}/> }
                  <span>At least one uppercase letter</span>
                </li>
                <li className={`flex flex-row items-center`}>
                  { passwordRequirements.lowercase ? <FaCheckCircle className={`text-xl mr-2 text-emerald-600/90`}/> : <FaCircleXmark className={`text-xl mr-2 text-destructive/90`}/> }
                  <span>At least one lowercase letter</span></li>
                <li className={`flex flex-row items-center`}>
                  { passwordRequirements.number ? <FaCheckCircle className={`text-xl mr-2 text-emerald-600/90`}/> : <FaCircleXmark className={`text-xl mr-2 text-destructive/90`}/> }
                  <span>At least one number</span>
                </li>
                <li className={`flex flex-row items-center`}>
                  { passwordRequirements.special ? <FaCheckCircle className={`text-xl mr-2 text-emerald-600/90`}/> : <FaCircleXmark className={`text-xl mr-2 text-destructive/90`}/> }
                  <span>At least one special character</span>
                </li>
              </ul>
            </FormDescription>
          </FormItem>
        )}/>
        {/* TODO: Add password requirements */}
        <FormField control={form.control} name="passwordConfirm" render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input {...field} type="password" />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}/>
        <div className={`flex flex-row gap-4`}>
          <Button className={`w-full`} variant={'outline'} onClick={goBack} type='button'>Back</Button>
          <Button className={`w-full`} type='submit'>
            {loading ? <ClipLoader color={'#fff'} loading={loading} size={25} /> : <span>Create Account</span>}
          </Button>
        </div>
      </form>
    </Form>
  )
}
