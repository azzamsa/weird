<script lang="ts">
	import { pow_work_wasm } from '$lib/spow/spow-wasm';
	import { get_pow_challenge } from '$lib/rauthy/client';
	import { checkResponse } from '$lib/utils';
	import { env } from '$env/dynamic/public';

	let processing = $state(false);
	let error: string | null = $state(null);
	let email = $state('');
	let pow: string | undefined = $state(undefined);

	async function handleSubmit(event: SubmitEvent) {
		processing = true;
		event.preventDefault();
		try {
			let challenge = await get_pow_challenge();
			console.debug('Computing proof of work');
			pow = await pow_work_wasm(challenge);
			console.debug('Completed proof of work');
			if (!pow) {
				error = 'Error computing proof of work, you may need a browser update.';
				processing = false;
				return;
			}

			const home = new URL(window.location.href);
			home.pathname = '/auth/v1/account';
			const registerResp = await fetch('/auth/v1/users/register', {
				method: 'post',
				body: JSON.stringify({
					email,
					given_name: 'Weird',
					family_name: 'User',
					// This isn't really used, we do the redirect manually.
					redirect_uri: home,
					pow
				})
			});
			await checkResponse(registerResp);

			window.location.replace('/account/register/confirmation');
		} catch (e) {
			processing = false;
			error = 'Email address is invalid.';
		}
	}
</script>

<svelte:head>
	<title>Register | {env.PUBLIC_INSTANCE_NAME}</title>
</svelte:head>

<main class="flex flex-col items-center">
	<form class="card mt-12 flex w-[600px] max-w-[90%] flex-col gap-4 p-8" onsubmit={handleSubmit}>
		{#if error}
			<div class="rounded-sm bg-error-500 p-3">
				Error registering user: {error}
			</div>
		{/if}
		<h1 class="my-3 text-2xl">Register New Account</h1>
		<label class="label">
			<span>Email</span>
			<input name="email" class="input" type="text" placeholder="Email" bind:value={email} />
		</label>
		<input type="hidden" name="pow" value="" />

		<p class="mt-4">
			Already have an account? <a href="/auth/v1/account" class="underline">Login</a>.
		</p>

		<button class="variant-filled btn" disabled={processing}>
			{processing ? 'Loading...' : 'Register'}
		</button>
	</form>
</main>
