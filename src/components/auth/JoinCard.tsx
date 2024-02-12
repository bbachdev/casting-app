'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { joinSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import SSOPanel from './SSOPanel';
import { useTransition } from 'react';
import { attemptLogin } from '@/actions/auth';

export default function SignInCard() {
  const form = useForm<z.infer<typeof joinSchema>>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  async function onSubmit(data: z.infer<typeof joinSchema>) {
    console.log("Attempt Sign Up")
  }

  return (
    <Card className={`mx-auto w-1/3 flex flex-col`}>
      <CardHeader className={`text-center text-3xl font-semibold`}>Join</CardHeader>
      <CardContent>
        <SSOPanel />
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
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
              </FormItem>
            )}/>
            <FormField control={form.control} name="passwordConfirm" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="passwordConfirm" />
                </FormControl>
              </FormItem>
            )}/>
            <Button className={`w-full`}>Sign In</Button>
          </form>
        </Form>
        <div className={`mt-4 w-full flex flex-col`}>
          <Link className={`text-sm text-center font-semibold`} href={`/signin`}>Already have an account?</Link>
        </div>
      </CardContent>
    </Card>
  )
}
