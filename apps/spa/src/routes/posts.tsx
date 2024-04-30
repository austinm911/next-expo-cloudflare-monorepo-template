import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'

// eslint-disable-next-line react-refresh/only-export-components
export const postsQueryOptions = queryOptions({
	queryKey: ['posts'],
	queryFn: () => [
		{ id: '1', title: 'Post 1' },
		{ id: '2', title: 'Post 2' },
	],
})

export const Route = createFileRoute('/posts')({
	component: PostsComponent,
})

function PostsComponent() {
	const postsQuery = useSuspenseQuery(postsQueryOptions)
	const posts = postsQuery.data

	return (
		<div className='flex gap-2 p-2'>
			<ul className='list-disc pl-4'>
				{[...posts, { id: 'i-do-not-exist', title: 'Non-existent Post' }]?.map((post) => {
					return (
						<li key={post.id} className='whitespace-nowrap'>
							<div>{post.title.substring(0, 20)}</div>
						</li>
					)
				})}
			</ul>
			<hr />
			<Outlet />
		</div>
	)
}
