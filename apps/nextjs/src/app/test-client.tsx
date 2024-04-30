'use client'

import { useMemo } from 'react'

import { trpc } from '@/trpc/client'

const TestClient = () => {
	const resp = trpc.post.hello.useQuery('Billy Bob from test client on' + new Date())
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
