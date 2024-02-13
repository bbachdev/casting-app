'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import SSOPanel from '../SSOPanel';
import { joinSchemaBasicInfo } from '@/schemas/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

import { getDayListForMonth, getMonthList, monthToAcronym, getYearList } from '@/util/datetime';
import { useState } from 'react';

export default function BasicInfo() {
  const currentDate = new Date()
  const initialDayList = getDayListForMonth(currentDate.getMonth() + 1, currentDate.getFullYear())
  const [dobMonth, setDobMonth] = useState<number>(currentDate.getMonth())
  const [dobDay, setDobDay] = useState<number>(currentDate.getDate())
  const [dobYear, setDobYear] = useState<number>(currentDate.getFullYear())
  const [dayList, setDayList] = useState<string[]>(initialDayList)

  const form = useForm<z.infer<typeof joinSchemaBasicInfo>>({
    resolver: zodResolver(joinSchemaBasicInfo),
    defaultValues: {
      email: "",
      dateOfBirth: new Date(),
    },
  })

  function onSubmit(data: z.infer<typeof joinSchemaBasicInfo>) {
    console.log("Basic Info: ", data)
  }

  function setMonth(value: string) {
    setDobMonth(parseInt(value))
    setDayList(getDayListForMonth(parseInt(value) + 1, dobYear))
    if(dobDay > dayList.length) {
      setDobDay(dayList.length -1)
    }
  }

  function setYear(value: string) {
    setDobYear(parseInt(value))
    setDayList(getDayListForMonth(dobMonth + 1, parseInt(value)))
    if(dobDay > dayList.length) {
      setDobDay(dayList.length -1)
    }
  }

  //TODO: Figure out how to set days visually when month/year changes

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
                <Input {...field} type="email" />
              </FormControl>
            </FormItem>
          )}/>
          <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                {/* TODO: Add date picker for DOB */}
                <div className={`flex flex-row gap-4`}>
                  <Select onValueChange={(e) => setMonth(e)}>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder={ monthToAcronym(dobMonth) } />
                    </SelectTrigger>
                    <SelectContent>
                      {getMonthList().map((month) => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(e) => setDobDay(parseInt(e))} value={dobDay.toString()}>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder={dobDay} />
                    </SelectTrigger>
                    <SelectContent>
                      { dayList.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(e) => setYear(e)}>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder={dobYear} />
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
          )}/>

          <Button className={`w-full`}>Next</Button>
        </form>
      </Form>
    </>
    
  )
}
