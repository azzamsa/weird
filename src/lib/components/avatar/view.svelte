<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { Avatar } from '@skeletonlabs/skeleton';

	let { user_id, username, width }: { user_id?: string; username?: string; width?: string } =
		$props();
	const fallback = `${env.PUBLIC_DICEBEAR_URL}/8.x/${env.PUBLIC_DICEBEAR_STYLE}/svg?seed=${username}`;
	let src = (user_id && `/account/${user_id}/avatar`) || (username && `/${username}/avatar`);
</script>

<Avatar
	background="bg-transparent"
	{src}
	rounded="rounded-full"
	width={width || 'w-32'}
	{fallback}
/>
