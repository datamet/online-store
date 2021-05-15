<script>
	import { link } from 'svelte-routing'
	import Heading from '../type/Heading.svelte'
	export let size = 'small', text = false
</script>

<a href="/" use:link>
	<img class="{size}" class:text src="logo-450.png" alt="Golden camel" />
	{#if text}
		<h1>SAHARA</h1>
	{/if}
</a>

<style>
	a:link,
	a:visited {
		text-decoration: none;
		color: var(--text-g);
		display: flex;
		align-items: center;
	}

    h1 {
        font-family: 'Inter', 'sans-serif';
        font-weight: 400;
        font-size: 1.8rem;
        letter-spacing: .1em;
    }

	img {
		width: 4rem;
	}

    img.text {
		margin-right: var(--gap);
    }

	.medium {
		width: 8rem;
	}
</style>
