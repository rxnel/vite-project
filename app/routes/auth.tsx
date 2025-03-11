import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
	const [email, setEmail] = useState<string>('');
	const { user, loading, signIn } = useAuth();

	// If the user is already authenticated, redirect to home
	if (user && !loading) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { error } = await signIn(email);

		if (error) {
			alert(error.message);
		} else {
			alert('Check your email for the login link!');
		}
	};

	return (
		<div className='max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-6'>Sign in to your account</h1>
			<p className='mb-4 text-gray-600'>
				Sign in via magic link with your email below
			</p>
			<form
				onSubmit={handleLogin}
				className='space-y-4'>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700 mb-1'>
						Email
					</label>
					<input
						id='email'
						type='email'
						placeholder='Your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
					/>
				</div>
				<button
					type='submit'
					disabled={loading}
					className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'>
					{loading ? 'Loading...' : 'Send magic link'}
				</button>
			</form>
		</div>
	);
}
