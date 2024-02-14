'use client'
import { Card, CardContent, CardHeader } from '../ui/card';
import { JoinSchema } from '@/schemas/auth';
import { useState } from 'react';

import BasicInfo from './JoinSteps/BasicInfo';
import AuthInfo from './JoinSteps/AuthInfo';

export default function SignInCard() {
  const [userInfo, setUserInfo] = useState<JoinSchema>({ email: "", dateOfBirth: new Date(), displayName: "", password: "", passwordConfirm: "" })
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <Card className={`mx-auto w-full md:w-1/2 lg:w-1/3 flex flex-col`}>
      <CardHeader className={`text-center text-3xl font-semibold`}>Join</CardHeader>
      <CardContent>
        { currentStep === 0 && (
          <BasicInfo setUserInfo={setUserInfo} setCurrentStep={setCurrentStep}/>
        )}
        { currentStep === 1 && (
          <AuthInfo setUserInfo={setUserInfo} setCurrentStep={setCurrentStep}/>
        )}
      </CardContent>
    </Card>
  )
}
