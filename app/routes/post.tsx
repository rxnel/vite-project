import type { Route } from './+types/post';

export async function loader({ params }: Route.LoaderArgs) {
	const postId = Number(params.postId);
	return { postId };
}

export async function action() {}

export default function Post({ loaderData }: Route.ComponentProps) {
	return (
		<div>
			<h1>Post {loaderData.postId}</h1>
		</div>
	);
}
