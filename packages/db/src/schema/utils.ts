import { date } from 'drizzle-orm/pg-core'

export const dateFields = {
	createdAt: date('created_at').defaultNow(),
	updatedAt: date('updated_at'),
	deletedAt: date('deleted_at'),
}
