<script>
	import { admin } from '../directives/admin'
	import { navigate } from 'svelte-routing'
	import Button from '../components/feature/Button.svelte'
	import Form from '../components/feature/form/Form.svelte'
	import FormGroup from '../components/feature/form/FormGroup.svelte'
	import FromText from '../components/feature/form/FromText.svelte'
	import Input from '../components/feature/form/Input.svelte'
	import Container from '../components/layout/Container.svelte'
	import Heading from '../components/type/Heading.svelte'
	import {
		validProductName,
		validPrice,
		validStock,
		validKeywords,
        validKeyword,
		validShortDesc,
		validLongDesc,
        createProduct
	} from '../../../api/endpoints'
    import KeywordList from '../components/feature/keywords/KeywordList.svelte'

    let validate = {
        name: validProductName,
        price: validPrice,
        stock: validStock,
        keywords: validKeywords,
        keyword: validKeyword,
        short_desc: validShortDesc,
        long_desc: validLongDesc
    }

	export let product = {
		name: '',
		price: 0,
		stock: 0,
		keywords: [],
		short_desc: '',
		long_desc: '',
	}

    let keyword, keywords = [], clearKeyword
    $: keywordValid = keyword ? true : false
    $: product.keywords = keywords

    let errorMessage = ''

    const addKeyword = () => {
        if (!keywordValid) return
        if (keywords.indexOf(keyword) === -1) {
            keywords.push(keyword)
        }
        keywords = keywords
        keyword = ''
        if (clearKeyword) clearKeyword()
    }

    $: valid = product && product.name && product.price && product.stock && product.keywords.length > 0 && product.short_desc && product.long_desc

	const addProduct = async () => {
        const res = await createProduct(product)
        if (res.body.message && res.body.product_id) navigate(`/product/${res.body.product_id}`)
        else if (res.body.error) errorMessage = res.body.error.message
        else errorMessage = 'Something went wrong'
    }

    const validator = type => async val => {
		const obj = {}
		obj[type] = val
		const res = await validate[type](obj)
		if (res.body.message) return { valid: true }
		return { valid: false, message: res.body.error.message }
	}
</script>

<span use:admin />

<Container contain section narrow>
	<Form>
		<FormGroup>
			<Heading>Create Product</Heading>
			<FromText>Fill in the form to add a product to the store</FromText>
		</FormGroup>
		<FormGroup>
			<Input
				validator={validator('name')}
				bind:value={product.name}
				id="product-name"
				type="numer">Product Name</Input
			>
		</FormGroup>
		<FormGroup>
			<Input
                validator={validator('short_desc')}
				bind:value={product.short_desc}
				id="product-short-desc"
				type="text">Short Description</Input
			>
			<Input
                validator={validator('long_desc')}
				bind:value={product.long_desc}
				id="product-long-desc"
				type="text">Long Description</Input
			>
		</FormGroup>
        <FormGroup grid>
			<Input
                validator={validator('price')}
				bind:value={product.price}
				id="product-price"
				type="numer">Price (NOK)</Input
			>
			<Input
                validator={validator('stock')}			
				bind:value={product.stock}
				id="product-stock"
				type="numer">Stock</Input
			>
		</FormGroup>
        <div>
            <div class="keywords">
                <FormGroup>
                    <FromText>Add at least one keyword to the product</FromText>
                    <KeywordList bind:keywords={keywords} />
                </FormGroup>
            </div>
            <FormGroup grid>
                <Input
                    validator={validator('keyword')}			
                    bind:value={keyword}
                    bind:clear={clearKeyword}
                    id="product-keyword"
                    type="numer">Add Keyword</Input
                >
                <Button disabled={!keywordValid} action={addKeyword}>Add Keyword</Button>
            </FormGroup>
        </div>
		<FormGroup right>
			<Button disabled={!valid} action={addProduct}>Create Product</Button>
            <FromText error>{errorMessage}</FromText>
		</FormGroup>
	</Form>
</Container>

<style>
    .keywords {
        padding-bottom: 1rem;
    }
</style>
