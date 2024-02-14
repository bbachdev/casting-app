/* 
* Lucia adapter creation (done here rather than schema.ts due to "runtime logic" note in Drizzle documentation: https://orm.drizzle.team/docs/migrations)
*/
import pg from "pg";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new pg.Pool();
const db = drizzle(pool);

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);