<script>
	import Form from '../form/Form.svelte'
	import Search from '../form/Search.svelte'
	import TagList from '../tags/TagList.svelte'

	export let search = () => true, keywords = []

	let selectedKeywords, searchFrase

	const handleSearch = async (frase) => {
		searchFrase = frase
		await search(searchFrase, selectedKeywords)
		return true
	}

	const handleKeywordChange = ({ detail }) => {
		const { selected } = detail
		selectedKeywords = selected
		search(searchFrase, selectedKeywords)
	}

</script>

<div class="controls">
	<Search search={handleSearch}/>
	<TagList on:change={handleKeywordChange} tags={keywords} />
</div>

<style>
	.controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}
</style>
