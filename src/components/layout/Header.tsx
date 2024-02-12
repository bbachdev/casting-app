import Link from 'next/link';
import { Button } from '../ui/button';

export default function Header() {
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
          <div className={`flex flex-row gap-4 items-center`}>
            <Link href={`/signin`}>Sign In</Link>
            <Link href={`/join`}>
              <Button variant={`secondary`}>Join</Button>
            </Link>
          </div>
          
        </nav>
      </div>
    </header>
  )
}