import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { api } from '@/trpc/api'

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	const resp = api.post.hello.useQuery(' from Hono/tRPC API on Client Side!')
	return (
		<>
			<div className='flex gap-2 p-2 text-lg'>
				<Link
					to='/'
					activeProps={{
						className: 'font-bold',
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>{' '}
				<Link
					to={'/posts'}
					activeProps={{
						className: 'font-bold',
					}}
				>
					Posts
				</Link>{' '}
				<Link
					to='/layout-a'
					activeProps={{
						className: 'font-bold',
					}}
				>
					Layout
				</Link>
				<div>{resp.data}</div>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position='bottom-right' />
		</>
	)
}
