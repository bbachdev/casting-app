'use client'
import ContentContainer from '@/components/layout/ContentContainer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThreeDots } from 'react-loader-spinner';
import { useTransition } from 'react';
import { attemptSignIn } from '@/actions/auth';
import { FaGoogle, FaApple } from "react-icons/fa";
import { redirect } from 'next/navigation';

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});

export default function SignIn() {
  const [isPending, startTransition] = useTransition()
  
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    startTransition(async () => {
      const response = await attemptSignIn(values.email, values.password)
      if(response.status === 302) {
        console.log('Successful login')
      }else{
        console.log('Unsuccessful login: ', response.body)
      }
    })
  }

  //TODO: Use enum for providers instead
  async function oauthSignIn(provider: string) {
    startTransition(async () => {
      const response = await fetch('/api/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          provider: provider
        })
      })
      console.log("Res: ", response)
      if(response.status === 200) {
        redirect(await response.text())
      }else{
        console.log('Unsuccessful login: ', response.body)
      }
    })
  }

  return (
    <ContentContainer>
      <Card className={`mt-12 mx-auto flex flex-col items-center justify-center w-1/2`}>
        <CardHeader className={`pb-4`}>
          <h1 className={`text-3xl font-bold`}>Sign In</h1>
        </CardHeader>
        <CardContent className={`w-9/12`}>
          <div className={`flex flex-col items-center mb-8`}>
            <Button className={`mt-8 w-full`} variant="brand" disabled={isPending} onClick={() => oauthSignIn('google')}>
              <FaGoogle className={`mr-2`} /> Sign In with Google
            </Button>
            <Button className={`mt-4 w-full`} variant="brand" disabled={isPending} onClick={() => oauthSignIn('apple')}>
              <FaApple className={`mr-2`} /> Sign In with Apple
            </Button>
          </div>
          <p>or</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`my-8 text-left w-full`}>
              <FormField name="email" control={form.control} render={({field}) => (
                <FormItem className={`my-4`}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="person@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField name="password" control={form.control} render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <Button className={`mt-8 w-full`} type="submit" variant="brand">
                { isPending && (
                  <ThreeDots color="white" height={24} width={24} />
                )}
                {!isPending && 'Sign In'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>{`Don't have an account? `}<a href="/signup" className={`text-sky-950`}>Sign Up</a></p>
        </CardFooter>
      </Card>
    </ContentContainer>
  )
}