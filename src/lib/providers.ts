import { IconType } from 'react-icons';
import { FcGoogle } from "react-icons/fc";
import { GoPasskeyFill } from "react-icons/go";
import { FaApple } from "react-icons/fa";

type SignInProvider = {
  id: string
  text: string
  icon: IconType
  brandColor: string
  hoverColor: string
  textColor: string
}

export const altSignInProviders: SignInProvider[] = [
  {
    id: 'passkey',
    text: 'Passkey',
    icon: GoPasskeyFill,
    brandColor: 'bg-cyan-600',
    hoverColor: 'hover:bg-cyan-600/90',
    textColor: 'text-white'
  },
  {
    id: 'google',
    text: 'Google',
    icon: FcGoogle,
    brandColor: 'bg-white',
    hoverColor: 'hover:bg-slate-50',
    textColor: 'text-black'
  },
  {
    id: 'apple',
    text: 'Apple',
    icon: FaApple,
    brandColor: 'bg-black',
    hoverColor: 'hover:bg-black/90',
    textColor: 'text-white'
  }
]