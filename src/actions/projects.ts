'use server'
import { ProjectWithTags } from '@/types/Projects'
import { ServerActionResponse } from '@/util/actions'

export const getProjects = async () : Promise<ServerActionResponse> => {
  const projectList: ProjectWithTags[] = []

  //Temp: Create test projects
  for (let i = 0; i < 10; i++) {
    projectList.push({
      id: i,
      name: `Project ${i}`,
      description: `Description for project ${i}`,
      createdAt: new Date(),
      endDate: new Date(),
      userId: '1',
      tags: [{ id: 1, name: 'Tag 1', color: 'bg-emerald-200'}]
    })
  }
  return ServerActionResponse(200, projectList)
}

export const getProjectDetails = async (projectId: string) : Promise<ServerActionResponse> => {
  const project: ProjectWithTags = {
    id: parseInt(projectId),
    name: `Project ${projectId}`,
    description: `Description for project ${projectId}`,
    createdAt: new Date(),
    endDate: new Date(),
    userId: '1',
    tags: [{ id: 1, name: 'Tag 1', color: 'bg-emerald-200'}]
  }
  return ServerActionResponse(200, project)
}