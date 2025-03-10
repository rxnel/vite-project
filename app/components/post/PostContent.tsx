import type { FetcherWithComponents } from 'react-router';

interface PostContentProps {
	post: {
		title: string;
		body: string;
	};
	fetcher: FetcherWithComponents<{ isDeleted: boolean }>;
}

export function PostContent({ post, fetcher }: PostContentProps) {
	return (
		<div>
			<div className='space-y-4'>
				<h1 className='text-3xl font-bold text-gray-900'>{post.title}</h1>
				<p className='text-gray-700 leading-relaxed'>{post.body}</p>
			</div>
			<div className='mt-8 border-t pt-4'>
				<fetcher.Form method='delete'>
					<button
						type='submit'
						className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'>
						Delete Post
					</button>
				</fetcher.Form>
			</div>
		</div>
	);
}
