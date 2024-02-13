'use client'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { joinSchemaAuthInfo } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function AuthInfo() {
  const form = useForm<z.infer<typeof joinSchemaAuthInfo>>({
    resolver: zodResolver(joinSchemaAuthInfo),
    defaultValues: {
      displayName: "",
      password: "",
      passwordConfirm: "",
    },
  })

  function onSubmit(data: z.infer<typeof joinSchemaAuthInfo>) {
    console.log("Basic Info: ", data)
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
        <Button className={`w-full`}>Create Account</Button>
      </form>
    </Form>
  )
}
