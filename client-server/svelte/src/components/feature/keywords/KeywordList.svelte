<script>
	import Keyword from './Keyword.svelte'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

	export let keywords = []

	const remove = event => {
        const keyword = event.detail.keyword
        dispatch('remove', { keyword })
		keywords.splice(keywords.indexOf(keyword), 1)
		keywords = keywords
	}
</script>

<ul class="gap">
	{#each keywords as keyword (keyword)}
		<li><Keyword {keyword} on:x={remove} removable /></li>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
	}
</style>
