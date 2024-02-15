import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <div className={`flex flex-row gap-2`}>
      <Input placeholder={`Search Projects...`} />
      <Button><FaSearch/></Button>
    </div>
  )
}
