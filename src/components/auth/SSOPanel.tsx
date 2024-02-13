'use client'
import { Button } from '../ui/button';

import { altSignInProviders } from '@/lib/providers';

interface SSOPanelProps {
  variant?: 'join' | 'signIn'
}

export default function SSOPanel(props: SSOPanelProps) {
  const type = props.variant || 'signIn'
  const text = type === 'join' ? 'Sign up with ' : 'Sign in with '

  //TODO: Actually do something here
  function optionClicked (provider: string) {
    if(type === 'join') {
      console.log(`Join with ${provider}`)
    }
    if(type === 'signIn') {
      console.log(`Sign in with ${provider}`)
    }
  }

  return (
    <div className={`flex flex-col gap-4`}>
      {altSignInProviders.map((provider) => (
        <Button key={provider.id} className={`${provider.brandColor} ${provider.hoverColor}`} onClick={() => optionClicked(provider.id)}>
          <div className={`flex flex-row items-center gap-2`}>
            <provider.icon className={`text-2xl`} />
            <span className={provider.textColor}>{text+provider.text}</span>
          </div>
        </Button>
      ))}
    </div>
  )
}