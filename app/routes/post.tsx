import { Form, redirect, useFetcher } from 'react-router';
import type { Route } from './+types/post';
import { PostContent } from '../components/post/PostContent';
import { PostDeleted } from '../components/post/PostDeleted';

export async function clientLoader({ params }: Route.LoaderArgs) {
	const postId = Number(params.postId);

	if (!postId || isNaN(postId)) {
		throw new Error('Post ID is required');
	}

	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${postId}`
	);
	const post = await res.json();
	return { post };
}

export async function clientAction({ params }: Route.ClientActionArgs) {
	try {
		await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
			method: 'DELETE',
		});
	} catch (error) {
		console.error(error);
		return { isDeleted: false };
	}
	return { isDeleted: true };
}

export default function Post({ loaderData }: Route.ComponentProps) {
	const fetcher = useFetcher<{ isDeleted: boolean }>();
	const isDeleted = fetcher.data?.isDeleted;

	return (
		<div className='max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
			{isDeleted ? (
				<PostDeleted />
			) : (
				<PostContent
					post={loaderData.post}
					fetcher={fetcher}
				/>
			)}
		</div>
	);
}
