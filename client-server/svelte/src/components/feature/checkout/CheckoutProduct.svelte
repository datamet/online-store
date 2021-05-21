<script>
    import Heading from '../../type/Heading.svelte'
    import Container from '../../layout/Container.svelte'
    export let product, percent = 0
    let currency = product.currency || 'NOK'

    const discountPrice = (price, percent) => {
		const factor = (100 - percent) * 0.01
		return price * factor
	}

</script>

<div class="product">
    <Container content>
        <div class="flex gap">
            <Heading type="h3">{product.name}</Heading>
            <div class="price">
                {#if product.amount > 1}
                    <span class="price-per-unit">(per unit {currency} {discountPrice(product.price, percent)},-)</span>
                {/if} 
                <span class="price-total">{currency} {discountPrice(product.price * product.amount, percent)},-</span>    
            </div>
        </div>
    </Container>
</div>

<style>
    .product {
        border-bottom: 1px solid var(--back-lg);
        --f-size: 2rem;
    }

    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .price {
        display: flex;
        align-items: center;
    }

    .price-total {
        font-weight: 700;
        font-size: 1.3rem;
    }

    .price-per-unit {
        color: var(--text-g);
        padding-right: 1.2rem;
        font-size: 1.3rem;
    }
</style>