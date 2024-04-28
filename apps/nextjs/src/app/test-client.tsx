'use client'

import { api } from '@/trpc/client'

const TestClient = () => {
	const resp = api.post.hello.useQuery('Billy Bob from test client')
	console.log(resp.failureReason)

	if (resp.isLoading) {
		return <div>Loading...</div>
	}

	if (resp.isError) {
		return <div>Error: {resp.error.message}</div>
	}

	console.log(resp)

	return <div>{resp.data}</div>
}
export default TestClient
