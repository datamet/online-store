<script>
	import Icon from '../Icon.svelte'
	import { link } from 'svelte-routing'

    export let id

    const addToCart = () => {
        id = id
        alert("hi")
    }

</script>


	<div class="product">
        <a href="/products" use:link>
		<div class="image">
            <div class="add-to-cart">
                <button on:click|preventDefault={addToCart} class="gap add-to-cart-button">
                    <span>Add to cart</span>
                    <Icon sprite="add-cart" />
                </button>
            </div>
			<slot name="image">
				<Icon sprite="camera-off" />
			</slot>
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
		--i-size: 4rem;
		width: 100%;
		background-color: var(--back-g);
		border-radius: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image:before {
		content: '';
		float: left;
		padding-top: 100%;
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
