'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { signInSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import SSOPanel from './SSOPanel';
import { useTransition } from 'react';
import { attemptLogin } from '@/actions/auth';
import Error from '@/components/ui/error';

export default function SignInCard() {
  const [isLoading, startTransition] = useTransition()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    startTransition(() => {
      attemptLogin(data.email, data.password)
      .then((response) => {
        if(response) {
          if(response.status === 500) {
            form.setError("root", {
              type: "serverError", message: 'An error occurred. Please try again later.' 
            })
            return
          }
          else if(response.status !== 200) {
            form.setError("root", {
              type: "credentialFail", message: 'Invalid email or password. Please try again.' 
            })
            return
          }
        } 
      })
    })
  }

  return (
    <Card className={`mx-auto w-full md:w-1/2 lg:w-1/3 flex flex-col`}>
      <CardHeader className={`text-center text-3xl font-semibold`}>Sign In</CardHeader>
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
            {form.formState.errors.root?.type === 'credentialFail' && <Error message={``+form.formState.errors.root.message} /> }
            <Button className={`w-full`}>Sign In</Button>
          </form>
        </Form>
        <div className={`mt-4 w-full flex flex-row text-sm justify-center`}>
          <Link href={`/forgot-password`} className={`hover:underline`}>Forgot Password?</Link>
        </div>
        <div className={`mt-4 w-full flex flex-col`}>
          <Link className={`text-sm text-center font-semibold`} href={`/join`}>Don't have an account? Join now!</Link>
        </div>
      </CardContent>
    </Card>
  )
}
