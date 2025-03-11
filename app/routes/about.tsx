import { useState, useEffect } from 'react';
import supabase from '../utils/supabase';

interface Todo {
	id: number;
	created_at: string;
	title: string;
	completed: boolean;
}

function About() {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		async function getTodos() {
			let { data: Todos, error } = await supabase
				.from('Todos')
				.select('*')
				.order('created_at', { ascending: false });
			if (Todos) {
				setTodos(Todos as Todo[]);
			}
		}

		getTodos();
	}, []);

	return (
		<div>
			{todos.map((todo) => (
				<li key={todo.id}>{todo.title}</li>
			))}
		</div>
	);
}
export default About;
