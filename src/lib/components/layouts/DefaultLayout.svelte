<script>
	import { env } from '$env/dynamic/public';
	import { getUserInfo } from '$lib/rauthy';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const HOME_PAGE_URL = 'https://home.weird.one/';

	const userInfo = getUserInfo();

	const drawerStore = getDrawerStore();

	const openDrawer = () => {
		drawerStore.open();
	};
</script>

<svelte:head>
	<title>{env.PUBLIC_INSTANCE_NAME}</title>
</svelte:head>

<AppBar>
	<svelte:fragment slot="lead"
		><img src="/logo.png" alt="Weird Logo" width="40px" /></svelte:fragment
	>
	<svelte:fragment slot="default"
		><h1 class="text-xl font-bold">
			<a href={HOME_PAGE_URL}>{env.PUBLIC_INSTANCE_NAME}</a>
		</h1></svelte:fragment
	>
	<svelte:fragment slot="trail">
		<div class="hidden items-center gap-3 sm:flex">
			<a href="/members" class="variant-ghost btn">Members</a>
			{#if !userInfo}
				<a href="/auth/v1/account" class="variant-ghost btn">Login</a>
				<a href="/auth/v1/users/register" class="variant-ghost btn">Register</a>
			{:else}
				<a href="/auth/v1/account" class="variant-ghost btn">Profile</a>
				<a href="/auth/v1/oidc/logout" class="variant-ghost btn">Logout</a>
			{/if}
			<a href="/feedback" class="variant-ghost btn btn-icon" title="Leave Feedback">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-megaphone"
					viewBox="0 0 16 16"
				>
					<path
						d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z"
					/>
				</svg>
			</a>
			<LightSwitch />
		</div>
		<div class="sm:hidden">
			<button class="variant-ghost btn-icon" onclick={openDrawer} aria-label="Toggle drawer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-list"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
					/>
				</svg>
			</button>
		</div>
	</svelte:fragment>
</AppBar>

<div class="flex min-h-screen flex-col">
	<div class="flex-grow">
		<slot></slot>
	</div>

	<footer class="bottom-0 p-4 text-center text-xs text-surface-300">
		Avatars generated with
		<a class="underline" href="https://dicebear.com">DiceBear</a> and the
		<a class="underline" href={`https://dicebear.com/styles/${env.PUBLIC_DICEBEAR_STYLE}`}
			>{env.PUBLIC_DICEBEAR_STYLE}</a
		> style.
	</footer>
</div>
