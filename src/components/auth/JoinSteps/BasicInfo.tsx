'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import SSOPanel from '../SSOPanel';
import { JoinSchema, joinSchemaBasicInfo } from '@/schemas/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Error from '@/components/ui/error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

import { getDayListForMonth, getMonthList, monthToAcronym, getYearList } from '@/util/datetime';
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from 'react';
import { checkEmail } from '@/actions/auth';

import ClipLoader from 'react-spinners/ClipLoader';
import { start } from 'repl';

interface BasicInfoProps {
  userInfo: JoinSchema
  setUserInfo: Dispatch<SetStateAction<JoinSchema>>
  setCurrentStep: Dispatch<SetStateAction<number>>
}

export default function BasicInfo({ userInfo, setUserInfo, setCurrentStep}: BasicInfoProps) {
  const [loading, startTransition] = useTransition()
  const currentDate = (userInfo.dateOfBirth) ? userInfo.dateOfBirth : new Date()
  const initialDayList = getDayListForMonth(currentDate.getMonth() + 1, currentDate.getFullYear())
  const [dobMonth, setDobMonth] = useState<number>(currentDate.getMonth())
  const [dobDay, setDobDay] = useState<number>(currentDate.getDate())
  const [dobYear, setDobYear] = useState<number>(currentDate.getFullYear())
  const [dayList, setDayList] = useState<string[]>(initialDayList)

  const form = useForm<z.infer<typeof joinSchemaBasicInfo>>({
    resolver: zodResolver(joinSchemaBasicInfo),
    defaultValues: {
      email: userInfo.email || ''
    },
  })

  async function onSubmit(data: z.infer<typeof joinSchemaBasicInfo>) {
    startTransition(async () => {
      const dob = new Date(dobYear, dobMonth, dobDay)
      const email = data.email
      
      //Verify dob is 18 or older
      const eighteenYearsAgo = new Date()
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18)
      if (dob > eighteenYearsAgo) {
        //Set root error
        form.setError("root", {
          type: "dobTooYoung", message: "You must be 18 or older to join." 
        })
        return
      }

      //Check if email is already in use
      const userCheck = await checkEmail(email)
      if(userCheck.status === 200) {
        form.setError("email", {
          type: "userExists", message: "Email is already in use."
        })
        return
      }

      //Else, save data and move to next step
      setUserInfo(prevUserData => ({
        ...prevUserData, 
        email: email, 
        dateOfBirth: dob
      }))
      setCurrentStep(1)
    })
  }

  function setMonth(value: string) {
    setDobMonth(parseInt(value))
    setDayList(getDayListForMonth(parseInt(value) + 1, dobYear))
  }

  function setYear(value: string) {
    setDobYear(parseInt(value))
    setDayList(getDayListForMonth(dobMonth + 1, parseInt(value)))
  }

  return (
    <>
      <SSOPanel variant="join" />
      <p className={`text-center mt-4`}>or</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}/>
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              {/* TODO: Add date picker for DOB */}
              <div className={`flex flex-row gap-4`}>
                <Select onValueChange={(e) => setMonth(e)}>
                  <SelectTrigger className="w-1/3">
                    <SelectValue placeholder={ monthToAcronym(dobMonth)} defaultValue={dobMonth}/>
                  </SelectTrigger>
                  <SelectContent>
                    {getMonthList().map((month) => (
                      <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(e) => setDobDay(parseInt(e))}>
                  <SelectTrigger className="w-1/3">
                    <SelectValue placeholder={dobDay.toString()} defaultValue={dobDay}/>
                  </SelectTrigger>
                  <SelectContent>
                    { dayList.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(e) => setYear(e)}>
                  <SelectTrigger className="w-1/3">
                    <SelectValue placeholder={dobYear} defaultValue={dobYear}/>
                  </SelectTrigger>
                  <SelectContent>
                    { getYearList().map((year) => ( 
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormControl>
            <FormDescription>
              This will not be visible to other users. By creating account, you agree to our <Link href={`/tos`} className={`underline`}>Terms of Service</Link> and <Link href={`/privacy`} className={`underline`}>Privacy Policy</Link>, and confirm that you are at least 18 years old.
            </FormDescription>
          </FormItem>

          {form.formState.errors.root?.type === 'dobTooYoung' && <Error message={``+form.formState.errors.root.message} /> }

          <Button className={`w-full`} type='submit'>
            {loading ? <ClipLoader color={'#fff'} loading={loading} size={25} /> : "Next"}
          </Button>
        </form>
      </Form>
    </>
    
  )
}