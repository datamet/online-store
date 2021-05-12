<script>
	export let contained = false
</script>

<form class:contained on:submit|preventDefault>
	<slot />
</form>

<style>
	form {
		display: grid;
		gap: calc(var(--gap) * 3);
		max-width: 100%;
	}

	form.contained {
		padding: 4rem 3rem;
		border-radius: 0.5rem;
		box-shadow: 0 0.2rem 1rem -0.5rem var(--text-g);
	}
</style>
