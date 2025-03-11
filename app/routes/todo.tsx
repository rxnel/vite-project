import { useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import type { Tables } from '../../database.types';
import { TodoItem } from '../components/todo/TodoItem';

function Todo() {
	const [todos, setTodos] = useState<Tables<'Todos'>[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function getTodos() {
			try {
				const { data, error } = await supabase
					.from('Todos')
					.select('*')
					.order('created_at', { ascending: false });

				if (error) throw error;
				setTodos(data || []);
			} catch (e) {
				setError(e instanceof Error ? e.message : 'Failed to fetch todos');
			} finally {
				setIsLoading(false);
			}
		}

		getTodos();
	}, []);

	if (isLoading) {
		return (
			<div className='max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
				<p className='text-gray-500'>Loading todos...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
				<p className='text-red-500'>Error: {error}</p>
			</div>
		);
	}

	return (
		<div className='max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-6'>Todo List</h1>
			{todos.length === 0 ? (
				<p className='text-gray-500'>No todos found.</p>
			) : (
				<ul className='space-y-4'>
					{todos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
						/>
					))}
				</ul>
			)}
		</div>
	);
}

export default Todo;
