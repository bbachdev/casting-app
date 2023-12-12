import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className={`p-4 bg-teal-500 shadow-md text-white`}>
      <div className={`max-w-7xl mx-auto flex flex-row items-center`}>
        <div>
          Logo
        </div>
        <ul className={`ml-auto flex flex-row space-x-4`}>
          <li>
            <Button variant={`outline`} className={`bg-teal-500 hover:bg-teal-600 hover:text-white`}>Sign In</Button>
          </li>
          <li>
            <Button className={`bg-sky-700 hover:bg-sky-800`}>Join</Button>
          </li>
        </ul>
      </div>
      
    </header>
  )
}
