<script>
	export let form;
</script>

<div class="mx-auto max-w-md py-6">
	{#if form?.error}
		<aside class="alert variant-ghost">
			<!-- Message -->
			<div class="alert-message">
				<p>{form.error}</p>
			</div>
		</aside>
	{/if}
	<form method="post" class="mt-6">
		<div class=" md:flex-row flex flex-col items-center gap-4">
			<input
				required
				type="text"
				class="input"
				name="username"
				placeholder="Enter Linktree username"
			/>
			<button type="submit" class="variant-filled btn">Continue</button>
		</div>
	</form>
</div>
