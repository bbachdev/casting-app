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

export default function BasicInfo() {
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
                  <Select>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-1/3">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
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
