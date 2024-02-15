import { getProjects } from '@/actions/projects'
import { projectTable } from '@/db/schema'
import ProjectListItem from './ProjectListItem'
import FilterList from './FilterList'

type Project = typeof projectTable.$inferInsert

export default async function ProjectList() {
  const projectRes = await getProjects()
  const projects: Project[] = (projectRes.success) ? projectRes.response as Project[] : []

  return (
    <div className={`flex flex-row gap-4`}>
      <div className={`w-1/4`}>
        <FilterList/>
      </div>
      <div className={`w-1/2 flex flex-col gap-2`}>
        {projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}