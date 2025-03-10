import type { FetcherWithComponents } from 'react-router';
import { Form } from 'react-router';

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
				<div
					id='form-buttons'
					className='flex gap-4 justify-start'>
					<fetcher.Form method='delete'>
						<button
							type='submit'
							className='px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
							Delete Post
						</button>
					</fetcher.Form>
					<Form
						action='/'
						method='get'>
						<button
							type='submit'
							className='px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
							Go to home
						</button>
					</Form>
				</div>
			</div>
		</div>
	);
}
