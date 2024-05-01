import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { dbUrl } from './drizzle.config'

config({ path: '.dev.vars' })

const databaseUrl = drizzle(postgres(`${dbUrl}`, { ssl: 'require', max: 1 }))

const main = async () => {
	try {
		await migrate(databaseUrl, { migrationsFolder: 'migrations' })
		console.log('Migration complete')
	} catch (error) {
		console.log(error)
	}
	process.exit(0)
}
await main()
