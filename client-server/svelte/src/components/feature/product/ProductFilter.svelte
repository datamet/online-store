<script>
	import Form from '../form/Form.svelte'
	import Search from '../form/Search.svelte'
	import TagList from '../tags/TagList.svelte'

	export let search = () => true

	let keywords, searchFrase

	const handleSearch = async (frase) => {
		searchFrase = frase
		await search(searchFrase, keywords)
		return true
	}

	const handleKeywordChange = ({ detail }) => {
		const { selected } = detail
		keywords = selected
		search(searchFrase, keywords)
	}

</script>

<Form>
	<div class="controls">
		<Search search={handleSearch}/>
		<TagList on:change={handleKeywordChange} />
	</div>
</Form>

<style>
	.controls {
		margin: 4rem 0 7rem 0;
		border-radius: 0.3rem;
		display: grid;
		gap: 2rem;
		align-items: center;
	}
</style>
