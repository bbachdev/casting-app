import Link from 'next/link';
import { Card, CardHeader } from '../ui/card';
import { ProjectWithTags } from '@/types/Projects';

interface ProjectDetailsProps {
  project: ProjectWithTags
}

export default function ProjectDetails( {project} : ProjectDetailsProps) {
  return (
    <Card>
      <CardHeader>
        {/* TODO: Have the link layered on top of banner background */}
        <Link href={`/projects`} className={`text-sm hover:underline`}>{`< Back to Projects`}</Link>
        <h1 className={`pt-4 font-semibold text-2xl`}>{project.name}</h1>
        
        <p className={`text-slate-600 text-sm`}>{project.description}</p>
      </CardHeader>
    </Card>
  )
}
