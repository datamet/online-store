<script>
	import Icon from '../Icon.svelte'
	import { link } from 'svelte-routing'
	import { cart } from '../../../stores/cart'

    export let id, image = null

    const addToCart = () => {
        cart.add(id, 1)
    }

</script>


	<div class="product">
        <a href="/product/{id}" use:link>
		<div class="image">
            <div class="add-to-cart">
                <button on:click|preventDefault={addToCart} class="gap add-to-cart-button">
                    <span>Add to cart</span>
                    <Icon sprite="add-cart" />
                </button>
            </div>
			{#if image}
				<img class="img" src="{image}" alt="product">
			{:else}
				<div class="no-image">
					<Icon sprite="camera-off" />
				</div>
			{/if}
		</div>
		<div class="meta">
			<div class="flex">
				<h3 class="title">
					<slot name="title">No title</slot>
				</h3>
				<p class="price">
					<slot name="price">Unknown price</slot>
				</p>
			</div>
			<p class="desc">
				<slot name="description">No description provided</slot>
			</p>
		</div>
    </a>
	</div>

<style>
	a:link,
	a:visited {
		text-decoration: none;
		color: var(--text-g);
	}

	.product {
		max-width: 100%;
	}

	.image {
		position: relative;
		width: 100%;
		border-radius: 0.3rem;
        overflow: hidden;
	}

	.image::before {
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
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
        display: flex;
		background-color: var(--back-g);
        align-items: center;
        justify-content: center;
        --i-size: 4rem;
    }

    .meta {
        margin-top: 1.5rem;
        display: grid;
        gap: 1.5rem;
    }

	.flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title {
		margin: 0;
		color: var(--text-b);
	}

    .price {
        margin: 0;
        font-size: 1.5rem;
    }

	.desc {
		margin: 0;
	}
    
	.add-to-cart {
		--i-size: 2.3rem;
        display: flex;
        justify-content: center;
	}

    .add-to-cart-button {
		z-index: 10;
        top: 1rem;
        right: 1rem;
        position: absolute;
        visibility: hidden;
        opacity: 0;
        transition: .1s all ease-in-out;
        color: var(--text-p);
        background-color: var(--back-y);
        padding: 0;
        display: flex;
        align-items: center;
        font-size: 1.5rem;
		border: none;
        padding: .5rem 1rem;
        border-radius: .3rem;
    }

	.product:hover .add-to-cart-button {
        visibility: visible;
        opacity: 1;
	}
</style>
