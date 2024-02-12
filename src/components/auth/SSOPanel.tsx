import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { FcGoogle } from "react-icons/fc";
import { GoPasskeyFill } from "react-icons/go";

export default function SSOPanel() {

  //TODO: Make function instead to populate buttons


  return (
    <>
      <div className={`flex flex-col gap-4`}>
        <Button className={`bg-cyan-600 hover:bg-cyan-600/90`}>
          <div className={`flex flex-row items-center gap-2`}>
            <GoPasskeyFill className={`text-2xl`} />
            <span>Sign In with Passkey</span>
          </div>
        </Button>
        <Button className={`bg-white hover:bg-slate-50 text-black`}>
          <div className={`flex flex-row items-center gap-2`}>
            <FcGoogle className={`text-2xl`} />
            <span>Sign In with Google</span>
          </div>
        </Button>
      </div> 
    </>
  )
}