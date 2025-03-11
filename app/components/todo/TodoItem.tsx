import type { Tables } from '../../../database.types';
import { Form } from 'react-router';

interface TodoItemProps {
	todo: Tables<'Todos'>;
}

export function TodoItem({ todo }: TodoItemProps) {
	return (
		<li className='p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow'>
			<div className='flex items-center justify-between'>
				<div>
					<h3
						className={`text-lg font-medium ${
							todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
						}`}>
						{todo.title}
					</h3>
					<time
						dateTime={todo.created_at}
						className='text-sm text-gray-500'>
						Created: {new Date(todo.created_at).toLocaleDateString()}
					</time>
				</div>
				<div className='flex items-center gap-4'>
					<Form method='patch'>
						<input
							type='hidden'
							name='id'
							value={todo.id}
						/>
						<input
							type='hidden'
							name='completed'
							value={(!todo.completed).toString()}
						/>
						<button
							type='submit'
							className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
								todo.completed
									? 'bg-green-100 text-green-800 hover:bg-green-200'
									: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
							}`}>
							{todo.completed ? 'Completed' : 'Pending'}
						</button>
					</Form>
					<Form method='delete'>
						<input
							type='hidden'
							name='id'
							value={todo.id}
						/>
						<button
							type='submit'
							className='p-2 text-red-600 hover:text-red-800 transition-colors'
							title='Delete todo'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					</Form>
				</div>
			</div>
		</li>
	);
}
