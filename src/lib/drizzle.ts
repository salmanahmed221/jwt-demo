import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { InferModel } from 'drizzle-orm';

import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const db = drizzle(sql);

export const jwt_users = pgTable('jwt_users', {
  user_id: serial('user_id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  role: varchar('role', { length: 256 }).default('user'),
  photo: varchar('photo', { length: 256 }).default('default.png'),
  verified: boolean('verified').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type JwtUser = InferModel<typeof jwt_users>; // return type when queried
export type NewJwtUser = InferModel<typeof jwt_users, 'insert'>; // insert type
