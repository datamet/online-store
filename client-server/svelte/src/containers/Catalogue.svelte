<script>
    import ProductFilter from '../components/feature/product/ProductFilter.svelte'
	import ProductList from '../components/feature/product/ProductList.svelte'
	import Container from '../components/layout/Container.svelte'
	import { productStore, keywordStore } from '../stores/fetch'
	import { onMount } from 'svelte'
	import ProductListTraverser from '../components/feature/product/ProductListTraverser.svelte'
	import Heading from '../components/type/Heading.svelte'
	import Stack from '../components/layout/Stack.svelte'

    let search, keywords, index, count = 9, availableKeywords
	let previous, next

	const fetchProducts = async (url) => {
		const { set, res } = url ? await productStore.fetch(url) : await productStore.fetch({ search, keyword: keywords, index, count })
		let products = res.body.products
		previous = res.body.prev
		next = res.body.next
		if (products) set(products)
	}

	const fetchKeywords = async () => {
		const { set, res } = await keywordStore.fetch()
		if (res.body.keywords) availableKeywords = res.body.keywords
	}

	onMount(() => {
		fetchKeywords()
		fetchProducts()
	})

	const handleSearch = async (frase, selectedKeywords) => {
		search = frase
		keywords = selectedKeywords
		await fetchProducts()
		return true
	}

</script>

<Container contain>
	<ProductFilter search={handleSearch} keywords={availableKeywords || []}/>
</Container>
<Container contain content section>
	<div class="grid">
		{#if $productStore && $productStore.length > 0}
			<ProductList products={$productStore}/>
			<ProductListTraverser {previous} {next} fetch={fetchProducts} />
		{:else}
			<Container center>
				<Stack size="medium">
					<Heading center>No products</Heading>
					<span class="center">We are currently working filling the store with products.</span>
				</Stack>
			</Container>
		{/if}
	</div>
</Container>

<style>
	.grid {
		display: grid;
		gap: 4rem;
	}

	.center {
		text-align: center;
	}
</style>
