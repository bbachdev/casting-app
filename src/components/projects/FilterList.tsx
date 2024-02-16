'use client'
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import Search from './Search';

export default function FilterList() {

  function deselectAll() {
    console.log('deselect all')
  }

  return (
    <Card>
      <CardContent className={`p-4 w-full flex flex-col`}>
        <Search />
        <div className={`mt-4`}>
          <div className={`flex flex-row w-full items-center`}>
            <p className={`font-semibold text-lg`}>Filters</p>
            <button className={`ml-auto text-sm underline`} onClick={deselectAll}><p>Deselect All</p></button>
          </div>
          
          <div className={`mt-2`}>
            <p className={`font-semibold mb-2`}>Category</p>
            <div className={`flex flex-col gap-1`}>
              <div className={`flex flex-row items-center gap-2`}>
                <Checkbox id={`animation`} />
                <label htmlFor={`animation`}>Animation</label>
              </div>
              <div className={`flex flex-row items-center gap-2`}>
                  <Checkbox id={`commercial`} />
                  <label htmlFor={`commercial`}>Commercial</label>
              </div>
              <div className={`flex flex-row items-center gap-2`}>
                  <Checkbox id={`videogame`} />
                  <label htmlFor={`videogame`}>Video Games</label>
              </div>
            </div>
          </div>
        </div>
        <Button className={`mt-4`}>Filter</Button>
      </CardContent>
    </Card>
  )
}
