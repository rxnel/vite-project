import { Form } from 'react-router';

export function PostDeleted() {
	return (
		<div>
			<p className='text-gray-700 leading-relaxed'>Post deleted successfully</p>
			<Form
				action='/'
				method='get'>
				<button
					type='submit'
					className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
					Go to home
				</button>
			</Form>
		</div>
	);
}
