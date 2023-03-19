import { type Insertable, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import type { Kyselify } from "drizzle-orm/kysely";
import { type users } from "./schema";
import { env } from "~/env.mjs";

export type User = Kyselify<typeof users>;
export type UserInsertable = Insertable<User>;

interface Database {
  users: User;
}

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
  }),
});
