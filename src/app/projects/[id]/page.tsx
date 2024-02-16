import { getProjectDetails } from '@/actions/projects'
import ProjectDetails from '@/components/projects/ProjectDetails'
import { ProjectWithTags } from '@/types/Projects'
import { ServerActionResponse } from '@/util/actions'

interface ProjectDetailProps {
  params: {
    id: string
  }
}

export default async function ProjectDetail({ params } : ProjectDetailProps ) {
  const projectDetailsResponse : ServerActionResponse = await getProjectDetails(params.id)
  const project : ProjectWithTags = (projectDetailsResponse.success) ? projectDetailsResponse.response as ProjectWithTags : {} as ProjectWithTags

  return (
    <div>
      <ProjectDetails project={project} />
    </div>
  )
}
