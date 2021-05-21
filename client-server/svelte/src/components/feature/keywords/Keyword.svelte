<script>
	import Icon from '../Icon.svelte'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    const handleClick = () => {
        dispatch('x', { keyword })
    }

	export let keyword, removable = false
</script>

<span class="container">
	<span>{keyword}</span>
	{#if removable}
		<button on:click={handleClick}><Icon sprite="cross" /></button>
	{/if}
</span>

<style>
	.container {
		background-color: var(--back-p);
		padding: 0.1rem 0.2rem;
        border-radius: .3rem;
		--i-size: 1.5rem;
        display: flex;
        align-items: center;
	}
    button {
        border: none;
        margin: 0;
        padding: 0;
        background: transparent;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
</style>
