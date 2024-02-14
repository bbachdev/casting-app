/* 
* Lucia adapter creation (done here rather than schema.ts due to "runtime logic" note in Drizzle documentation: https://orm.drizzle.team/docs/migrations)
*/
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "./schema";
import db from "@/lib/drizzle";

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);