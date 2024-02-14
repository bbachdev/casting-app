'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { JoinSchema, joinSchemaAuthInfo } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

type AuthInfoProps = {
  setUserInfo: Dispatch<SetStateAction<JoinSchema>>
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function AuthInfo({ setUserInfo, setCurrentStep}: AuthInfoProps) {
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
      displayName: "",
      password: "",
      passwordConfirm: "",
    },
  })

  async function passwordChanged(event: FormEvent<HTMLInputElement>) {
    const password = event.currentTarget.value
    console.log("Password: ", password)
    setPasswordRequirements({
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#\$%\^&\*]/.test(password),
    },)
  }

  function onSubmit(data: z.infer<typeof joinSchemaAuthInfo>) {
    console.log("Basic Info: ", data)
  }

  function goBack() {
    setCurrentStep(0)
  }

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
              <Input {...field} type="passwordConfirm" />
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}/>
        <div className={`flex flex-row gap-4`}>
          <Button className={`w-full`} variant={'outline'} onClick={goBack} type='button'>Back</Button>
          <Button className={`w-full`} type='submit'>Create Account</Button>
        </div>
      </form>
    </Form>
  )
}
