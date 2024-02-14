import Link from 'next/link';
import { Button } from '../ui/button';
import { validateRequest } from '@/actions/auth';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { FaBell } from "react-icons/fa";
import NotificationBell from '../user/NotificationBell';

export default async function Header() {
  const { user } = await validateRequest();
  const avatar = user?.profileImageUrl
  //if(user) {
    console.log("User: ", user)
  //}

  return (
    <header className={`p-6 bg-teal-700 text-white flex flex-row`}>
      <div className={`mx-auto w-full max-w-[1440px] flex flex-row items-center`}>
        <div>
          <Link href={`/`}>Header</Link>
        </div>
        <nav className={`ml-auto flex flex-row`}>
          <div className={`flex flex-row gap-4 items-center mr-12`}>
            <Link href={`/projects`}>Explore Projects</Link>
          </div>
          <div className={`flex flex-row gap-6 items-center`}>

            {/* Logged in */}
            { user && (
              <>
                <NotificationBell />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={avatar} />
                      <AvatarFallback className={`bg-[#0F4B76]`}>{user.displayName.substring(0,1)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={`/dashboard`}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`hover:cursor-pointer`}>
                      <Link href={`/settings`}>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={`hover:cursor-pointer`}>
                      <Link href={`/signout`}>Sign Out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
              
            )}

            {/* Not logged in */}
            { !user && (
              <>
                <Link href={`/signin`}>Sign In</Link>
                <Link href={`/join`}>
                  <Button variant={`secondary`}>Join</Button>
                </Link>
              </>
            )}
          </div>
          
        </nav>
      </div>
    </header>
  )
}