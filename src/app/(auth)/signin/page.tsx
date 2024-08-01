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

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    startTransition(() => {
      console.log(values)
    })
  }

  return (
    <ContentContainer>
      <Card className={`mt-12 mx-auto flex flex-col items-center justify-center w-1/3`}>
        <CardHeader>
          <h1 className={`text-3xl font-bold`}>Sign In</h1>
        </CardHeader>
        <CardContent>
          <p>or</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`my-8 text-left`}>
              <FormField name="email" control={form.control} render={(field) => (
                <FormItem className={`my-4`}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="person@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField name="password" control={form.control} render={(field) => (
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