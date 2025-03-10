interface PostContentProps {
	post: {
		title: string;
		body: string;
	};
}

export function PostContent({ post }: PostContentProps) {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-bold text-gray-900'>{post.title}</h1>
			<p className='text-gray-700 leading-relaxed'>{post.body}</p>
		</div>
	);
}
