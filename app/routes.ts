import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	// Public route for authentication
	route('auth', 'routes/auth.tsx'),

	// Root and protected routes
	index('routes/todo.tsx'),
	route('post-search', 'routes/post-search.tsx'),
	route('post/:postId', 'routes/post.tsx'),

	// Nested Route Example with Dashboard
	route('dashboard', 'routes/dashboard.tsx', [
		route('user-settings', 'routes/user-settings.tsx'),
		route('user-stats', 'routes/user-stats.tsx'),
	]),
] satisfies RouteConfig;
