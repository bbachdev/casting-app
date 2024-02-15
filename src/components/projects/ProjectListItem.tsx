import { projectTable } from '@/db/schema';
import { Card, CardContent } from '../ui/card';

type Project = typeof projectTable.$inferInsert

interface ProjectListItemProps {
  project: Project
}

export default function ProjectListItem( {project} : ProjectListItemProps) {
  return (
    <Card>
      <CardContent className={`p-3`}>
        <div className={`flex flex-row items-center`}>
          <div className={`flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full`}></div>
          <div className={`ml-2 flex flex-col`}>
            <h2 className={`font-semibold text-xl`}>{project.name}</h2>
            <p className={`text-slate-600 text-sm`}>{project.description}</p>
          </div>
        </div>
        
      </CardContent>
    </Card>
  )
}