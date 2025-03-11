import { useState, useEffect } from 'react';
import { useNavigate, useActionData } from 'react-router';
import { Toaster, toast } from 'sonner';
import supabase from '../utils/supabase';
import type { Tables } from '../../database.types';
import { TodoItem } from '../components/todo/TodoItem';
import { AddTodoForm } from '../components/todo/AddTodoForm';
import type { Route } from './+types/todo';

export async function clientAction({ request }: Route.ActionArgs) {
	const method = request.method.toLowerCase();

	if (method === 'post') {
		const formData = await request.formData();
		const title = formData.get('title') as string;

		const { error } = await supabase
			.from('Todos')
			.insert([{ title, completed: false }]);

		if (error) throw error;
		return { success: true, message: 'Todo added successfully!' };
	}

	if (method === 'patch') {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const completed = formData.get('completed') === 'true';

		if (isNaN(id)) throw new Error('Invalid todo ID');

		const { error } = await supabase
			.from('Todos')
			.update({ completed })
			.eq('id', id);

		if (error) throw error;
		return { success: true, message: 'Todo status updated successfully!' };
	}

	if (method === 'delete') {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (isNaN(id)) throw new Error('Invalid todo ID');

		const { error } = await supabase.from('Todos').delete().eq('id', id);

		if (error) throw error;
		return { success: true, message: 'Todo deleted successfully!' };
	}

	return null;
}

export default function Todo() {
	const [todos, setTodos] = useState<Tables<'Todos'>[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const actionData = useActionData<{ success: boolean; message: string }>();

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

	useEffect(() => {
		getTodos();
	}, []);

	useEffect(() => {
		if (actionData?.success) {
			getTodos();
			toast.success(actionData.message);
		}
	}, [actionData]);

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
			<Toaster position='top-center' />
			<h1 className='text-2xl font-bold mb-6'>Todo List</h1>
			<AddTodoForm />
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
