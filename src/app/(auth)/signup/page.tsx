'use client'
import ContentContainer from '@/components/layout/ContentContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { startTransition } from 'react';
import { FaApple, FaGoogle } from 'react-icons/fa';

export default function SignUp() {

  async function oauthRegister(provider: string) {
    startTransition(async () => {
      //const response = await attemptOAuthRegister(provider)
      // if(response.status === 302) {
      //   console.log('Successful login')
      // }else{
      //   console.log('Unsuccessful login: ', response.body)
      // }
    })
  }
  return (
    <ContentContainer>
      <Card className={`mt-12 mx-auto flex flex-col items-center justify-center w-1/2`}>
        <CardHeader className={`pb-4`}>
          <h1 className={`text-3xl font-bold`}>Sign Up</h1>
        </CardHeader>
        <CardContent className={`w-9/12`}>
          <div className={`flex flex-col items-center mb-8`}>
            <Button className={`mt-8 w-full`} variant="brand" onClick={() => oauthRegister('google')}>
              <FaGoogle className={`mr-2`} /> Sign In with Google
            </Button>
            <Button className={`mt-4 w-full`} variant="brand" onClick={() => oauthRegister('apple')}>
              <FaApple className={`mr-2`} /> Sign In with Apple
            </Button>
          </div>
          <p>or</p>
        </CardContent>
      </Card>
    </ContentContainer>
  )
}