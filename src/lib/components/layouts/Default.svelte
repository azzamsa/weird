<script>
	import { env } from '$env/dynamic/public';
	import NavBar from '$lib/components/layouts/Navbar.svelte';
</script>

<svelte:head>
	<title>{env.PUBLIC_INSTANCE_NAME}</title>
</svelte:head>

<NavBar />

<div>
	<slot></slot>
</div>
