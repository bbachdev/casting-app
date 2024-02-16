import { Card, CardContent, CardFooter } from '../ui/card';
import { ProjectWithTags } from '@/types/Projects';

import { GoClockFill } from "react-icons/go";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import Link from 'next/link';

interface ProjectListItemProps {
  project: ProjectWithTags
}

export default function ProjectListItem( {project} : ProjectListItemProps) {
  return (
    <Card>
      <CardContent className={`p-3`}>
        <div className={`flex flex-row items-center`}>
          <div className={`flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full`}></div>
          <div className={`ml-2 flex flex-col`}>
            <Link className={`hover:underline text-left`} href={`/projects/${project.id}`}><h2 className={`font-semibold text-xl`}>{project.name}</h2></Link>
            <p className={`text-slate-600 text-sm`}>{project.description}</p>
            <div className={`mt-2 flex flex-row gap-4`}>
              {project.tags.map((tag) => (
                <span key={tag.id} className={`text-xs ${tag.color} text-slate-500 rounded-full px-2 py-1 w-fit`}>{tag.name}</span>
              ))}
            </div>
          </div>
          <div className={`ml-auto mb-auto flex flex-row gap-4`}>
            <div className={`flex flex-row gap-2 items-center text-sm`}>
              <BsBookmark className={`text-2xl`}/>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}