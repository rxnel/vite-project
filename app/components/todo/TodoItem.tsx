import type { Tables } from '../../../database.types';

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
				<div className='flex items-center'>
					<span
						className={`px-3 py-1 rounded-full text-sm ${
							todo.completed
								? 'bg-green-100 text-green-800'
								: 'bg-yellow-100 text-yellow-800'
						}`}>
						{todo.completed ? 'Completed' : 'Pending'}
					</span>
				</div>
			</div>
		</li>
	);
}
