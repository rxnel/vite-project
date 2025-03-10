import { Form, redirect } from 'react-router';
import type { Route } from './+types/post';

export async function clientLoader({ params }: Route.LoaderArgs) {
	const postId = Number(params.postId);
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${postId}`
	);
	const post = await res.json();
	return { post };
}

export async function clientAction({ params }: Route.LoaderArgs) {
	await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
		method: 'DELETE',
	});
	return redirect(`/`);
}

export default function Post({ loaderData }: Route.ComponentProps) {
	return (
		<div className='max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
			<div className='space-y-4'>
				<h1 className='text-3xl font-bold text-gray-900'>
					{loaderData.post.title}
				</h1>
				<p className='text-gray-700 leading-relaxed'>{loaderData.post.body}</p>
			</div>
			<div className='mt-8 border-t pt-4'>
				<Form method='delete'>
					<button
						type='submit'
						className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'>
						Delete Post
					</button>
				</Form>
			</div>
		</div>
	);
}
