<script>
	import Tag from './Tag.svelte'
	export let tags = ['cloathing', 'food', 'gear'], selected = []

    const handleChange = ({ detail }) => {
        const { checked, tag } = detail
        if (checked) selected.push(tag)
        else if (selected.indexOf(tag) !== -1) selected.splice(selected.indexOf(tag), 1)
        selected = selected
    }
    
</script>

<ul class="gap">
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
    }
</style>
