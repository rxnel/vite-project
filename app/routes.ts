import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('todo', 'routes/todo.tsx'),
	route('post/:postId', 'routes/post.tsx'),

	// Nested Route Example with Dashboard
	route('dashboard', 'routes/dashboard.tsx', [
		route('user-settings', 'routes/user-settings.tsx'),
		route('user-stats', 'routes/user-stats.tsx'),
	]),
] satisfies RouteConfig;
