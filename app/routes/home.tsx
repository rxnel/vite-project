import { useNavigate } from 'react-router';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Home() {
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const postId = formData.get('postId');
		if (postId) {
			navigate(`/post/${postId}`);
		}
	};

	return (
		<div className='max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-6'>View Post by ID</h1>
			<form
				onSubmit={handleSubmit}
				className='space-y-4'>
				<div>
					<label
						htmlFor='postId'
						className='block text-sm font-medium text-gray-700 mb-1'>
						Post ID
					</label>
					<input
						type='number'
						id='postId'
						name='postId'
						min='1'
						required
						className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
						placeholder='Enter post ID'
					/>
				</div>
				<button
					type='submit'
					className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
					View Post
				</button>
			</form>
		</div>
	);
}
