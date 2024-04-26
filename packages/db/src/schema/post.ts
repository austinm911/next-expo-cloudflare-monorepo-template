import { varchar } from 'drizzle-orm/pg-core'

import { pgTable } from './_table'
import { dateFields } from './utils'

export const post = pgTable('post', {
	id: varchar('id').primaryKey(),
	title: varchar('name', { length: 256 }).notNull(),
	content: varchar('content', { length: 256 }).notNull(),
	...dateFields,
})
