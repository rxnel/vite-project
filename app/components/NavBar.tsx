import { Link } from 'react-router';

export function NavBar() {
	return (
		<nav className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 justify-between'>
					<div className='flex'>
						<div className='flex items-center flex-shrink-0'>
							<Link
								to='/'
								className='text-xl font-bold text-gray-800'>
								My App
							</Link>
						</div>

						<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
							<NavLink to='/'>Home</NavLink>
							<NavLink to='/dashboard/user-settings'>User Settings</NavLink>
							<NavLink to='/dashboard/user-stats'>User Stats</NavLink>
							<NavLink to='/about'>About</NavLink>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<Link
			to={to}
			className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500'>
			{children}
		</Link>
	);
}
