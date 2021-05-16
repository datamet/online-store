<script>
    import ProductFilter from '../components/feature/product/ProductFilter.svelte'
	import ProductList from '../components/feature/product/ProductList.svelte'
	import Container from '../components/layout/Container.svelte'
	import { productStore, keywordStore } from '../stores/fetch'
	import { onMount } from 'svelte'

    let search, keywords, index, count, availableKeywords

	const fetchProducts = async () => {
		const { set, res } = await productStore.fetch({ search, keyword: keywords, index, count })
		let products = res.body.products
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

<Container contain content>
	<ProductFilter search={handleSearch} keywords={availableKeywords || []}/>
	<ProductList products={$productStore}/>
</Container>

<style>
    
</style>
