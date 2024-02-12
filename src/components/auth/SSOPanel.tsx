'use client'
import { Button } from '../ui/button';

import { altSignInProviders } from '@/lib/auth';

export default function SSOPanel() {

  //TODO: Actually do something here
  function optionClicked (provider: string) {
    console.log('Sign in with: ' + provider)
  }

  return (
    <div className={`flex flex-col gap-4`}>
      {altSignInProviders.map((provider) => (
        <Button key={provider.id} className={`${provider.brandColor} ${provider.hoverColor}`} onClick={() => optionClicked(provider.id)}>
          <div className={`flex flex-row items-center gap-2`}>
            <provider.icon className={`text-2xl`} />
            <span className={provider.textColor}>{provider.text}</span>
          </div>
        </Button>
      ))}
    </div>
  )
}