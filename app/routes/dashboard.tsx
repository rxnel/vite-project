import { Outlet } from 'react-router';

export default function Dashboard() {
	return (
		<div>
			<h1>
				This is a nested Route. Parent route is /dashboard -- child route below
			</h1>
			<Outlet />
		</div>
	);
}
