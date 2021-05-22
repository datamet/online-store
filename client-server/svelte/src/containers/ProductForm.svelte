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
	import Icon from '../components/feature/Icon.svelte'

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
	let images, preview
	$: if (images) (() => {
		const img = images[0]
		const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onload = event => {
            preview = event.target.result
        }
	})()

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

	const toBase64 = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

	const addProduct = async () => {
		const productToAdd = {...product}
		if (images && images.length > 0) {
			productToAdd.images = []
			for (const image of images) {
				const fragment = image.name.split('.')
				const type = fragment[fragment.length - 1]
				const base64Image = await toBase64(image)
				productToAdd.images.push({ image: base64Image, type })
			}
		}
        const res = await createProduct(productToAdd)
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

<!-- <span use:admin /> -->

<Container contain section>
	<Form>
		<div class="grid">
			<FormGroup>
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
				<hr>
				<div>
					<div class="keywords">
						<FormGroup>
							<span class="small-heading"><Heading>Keywords</Heading></span>
							<FromText>Add at least one keyword, so that users can find the product easier.</FromText>
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
			</FormGroup>
			<FormGroup>
				<FormGroup>
					<FormGroup>
						<span class="small-heading"><Heading>Image</Heading></span>
						<FromText>A product will look much more appealing to users if it has an image. However, it is not required.</FromText>
						<FromText>
							<span class="bold">Allowed file types:</span>
							<span class="type">png</span>
							<span class="type">jpg</span>
							<span class="type">jpeg</span>
						</FromText>
						<input class="file-input" type="file" id="product-images" accept=".png,.jpg,.jpeg" bind:files={images}>
					</FormGroup>
					<div class="image-container">
						{#if preview}
							<img class="img" src="{preview}" alt="product">
						{:else}
							<div class="no-image">
								<Icon sprite="camera-off" />
							</div>
						{/if}
					</div>
					<FromText>This is how your image will look in the store. Images with 1:1 aspect ratios works best.</FromText>
				</FormGroup>
			</FormGroup>
		</div>
		<FormGroup>
			<Button disabled={!valid} action={addProduct}>Create Product</Button>
			<FromText error>{errorMessage}</FromText>
		</FormGroup>
	</Form>
</Container>

<style>
	.small-heading {
		--f-size: 2.2rem;
	}

	.bold {
		font-weight: 700;
	}

	.grid {
		display: grid;
		gap: 4rem;
		grid-template-columns: 1fr;
	}

	@media (min-width: 52.25em) {
		.grid {
			grid-template-columns: 1fr 30rem;
		}
	}

	.type {
		background-color: var(--back-lg);
		padding: .1rem .2rem;
		border-radius: .3rem;
	}

    .keywords {
        padding-bottom: 1rem;
    }

	.file-input {
		display: inline-block;
		width: 12rem;
		overflow: hidden;
	}

	.file-input::-webkit-file-upload-button {
		visibility: hidden;
	}
	.file-input::before {
		content: 'Upload image';
		outline: none;
		white-space: nowrap;
		-webkit-user-select: none;
		cursor: pointer;
		text-decoration: none;
        color: var(--text-b);
        background-color: var(--back-y);
        padding: 1rem 1.5rem;
        border-radius: .3rem;
        border: none;
        transition: all linear .2s;
        display: flex;
        align-items: center;
        --gap: 1rem;
        display: inline-flex;
        align-items: center;
	}
	.file-input:hover::before {
		color: var(--text-g);
        background-color: var(--control-y);
	}
	.file-input:active::before {
		background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
	}

	.image-container {
		position: relative;
		width: 100%;
		border-radius: 0.3rem;
        overflow: hidden;
	}

	.image-container::before {
		content: '';
		float: left;
		padding-top: 100%;
	}

    .img {
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .no-image {
		position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
		background-color: var(--back-g);
        align-items: center;
        justify-content: center;
        --i-size: 4rem;
    }
</style>
