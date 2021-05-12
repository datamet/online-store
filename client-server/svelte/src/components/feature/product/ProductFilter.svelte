<script>
	import Form from '../form/Form.svelte'
	import Search from '../form/Search.svelte'
	import TagList from '../tags/TagList.svelte'
</script>

<Form>
	<div class="controls">
		<Search />
		<TagList />
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
