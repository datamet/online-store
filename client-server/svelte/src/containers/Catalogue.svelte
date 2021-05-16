<script>
    import ProductFilter from '../components/feature/product/ProductFilter.svelte'
	import ProductList from '../components/feature/product/ProductList.svelte'
	import Container from '../components/layout/Container.svelte'
	import { productStore } from '../stores/fetch'
	import { onMount } from 'svelte'

    let search, keywords, index, count

	const fetchProducts = async () => {
		const { set, res } = await productStore.fetch({ search, keyword: keywords, index, count })
		if (res.body.products) set(res.body.products)
	}

	onMount(() => {
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
	<ProductFilter search={handleSearch}/>
	<ProductList products={$productStore} />
</Container>

<style>
    
</style>
