import { projectTable, tag } from '@/db/schema'

type Tag = typeof tag.$inferInsert

export type ProjectWithTags = typeof projectTable.$inferInsert & { tags: Tag[]}