import { Form } from 'react-router';
import { useRef } from 'react';

export function AddTodoForm() {
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		// Let the form submission proceed normally
		setTimeout(() => {
			// Reset the form after a brief delay to ensure the submission completes
			formRef.current?.reset();
		}, 100);
	};

	return (
		<Form
			ref={formRef}
			method='post'
			onSubmit={handleSubmit}
			className='mb-6'>
			<div className='flex gap-4'>
				<div className='flex-1'>
					<input
						type='text'
						name='title'
						required
						placeholder='Add a new todo...'
						className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
					/>
				</div>
				<button
					type='submit'
					className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
					Add Todo
				</button>
			</div>
		</Form>
	);
}
