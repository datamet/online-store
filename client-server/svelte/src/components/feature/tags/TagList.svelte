<script>
	import Tag from './Tag.svelte'
    import { createEventDispatcher } from 'svelte'
	export let tags = [], selected = []

    const dispatch = createEventDispatcher()

    const handleChange = ({ detail }) => {
        const { checked, tag } = detail
        if (checked) selected.push(tag)
        else if (selected.indexOf(tag) !== -1) selected.splice(selected.indexOf(tag), 1)
        dispatch('change', {
            selected
        })
        selected = selected
    }
    
</script>

<ul>
	{#each tags as tag (tag)}
		<li><Tag on:change={handleChange} name={tag}></Tag></li>
	{/each}
</ul>

<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: var(--gap);
        flex-wrap: wrap;
        max-width: 60rem;
        justify-content: center;
    }
</style>
