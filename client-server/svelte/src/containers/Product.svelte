<script>
	import Container from '../components/layout/Container.svelte'
	import { getProduct } from '../../../api/endpoints'
	import { onMount } from 'svelte'
	import Heading from '../components/type/Heading.svelte'
    import Stack from '../components/layout/Stack.svelte'
    import Icon from '../components/feature/Icon.svelte'
    import Button from '../components/feature/Button.svelte'
    import { cart } from '../stores/cart'
    import Catalogue from './Catalogue.svelte'

	export let id
	let product, message

	const fetchProduct = async () => {
		const res = await getProduct({ product_id: id })
		if (res.body.product) product = res.body.product
		else if (res.body.error) message = res.body.error.message
	}

    $: fetchProduct(id)

    const addToCart = () => {
        cart.add(id, 1)
    }

	// onMount(() => {
    //     fetchProduct()
    // })
</script>

<Container contain section>
	{#if product}
		<div class="product">
			<div class="images">
                 {#if product.images}
                    <img class="img" src="{product.images[0]}" alt="product">
                 {:else}
                    <div class="no-image">
                        <Icon sprite="camera-off" />
                    </div>
                 {/if}
            </div>
			<Container content>
				<Stack>
                    <Heading>{product.name}</Heading>
                    <ul class="keywords gap">
                        {#each product.keywords as keyword (keyword)}
                            <li class="keyword">{keyword}</li>
                        {/each}
                    </ul>
                    <div>
                        <p class="short_desc">{product.short_desc}</p>
                        <p class="long_desc">{product.long_desc}</p>
                    </div>
                    <div class="flex price">
                        <Heading h3>{product.currency ? product.currency : 'NOK'} {product.price},-</Heading>
                        <Button action={addToCart}>
                            <div class="flex gap">
                                <Icon sprite="add-cart" />
                                <span>Add to cart</span>
                            </div>
                        </Button>
                    </div>
                </Stack>
			</Container>
		</div>
	{:else}
		<Container center>
            <Heading>Woops</Heading>
		    <p>{message}</p>
        </Container>
	{/if}
</Container>

<Container contain section>
    <Heading center>More Products</Heading>
    <p class="center">Continue looking for products bellow</p>
    <Catalogue />
</Container>

<style>
    .images {
		position: relative;
		width: 100%;
		border-radius: 0.3rem;
        overflow: hidden;
	}

	.images::before {
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
        width: 100%;
        height: 100%;
        display: flex;
		background-color: var(--back-g);
        align-items: center;
        justify-content: center;
        --i-size: 6rem;
    }

	.product {
		display: grid;
        gap: 1rem 5rem;
		grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
	}

    .keywords {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .keyword {
        background-color: #d8c7e2;
        border-radius: .3rem;
        padding: .2rem .4rem;
    }

    .price {
        --f-size: 2.5rem;
    }

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .center {
        text-align: center;
    }
</style>
