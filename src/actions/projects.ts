'use server'
import { projectTable } from '@/db/schema'
import { ServerActionResponse } from '@/util/actions'

type Project = typeof projectTable.$inferInsert

export const getProjects = async () : Promise<ServerActionResponse> => {
  const projectList: Project[] = []

  //Temp: Create test projects
  for (let i = 0; i < 10; i++) {
    projectList.push({
      id: i,
      name: `Project ${i}`,
      description: `Description for project ${i}`,
      createdAt: new Date(),
      endDate: new Date(),
      userId: '1'
    })
  }
  return ServerActionResponse(200, projectList)
}