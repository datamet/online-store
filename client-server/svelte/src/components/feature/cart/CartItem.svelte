<script>
	import { onMount } from 'svelte'
    import { getProduct } from '../../../../../api/endpoints'
    import Container from '../../layout/Container.svelte'
    import Stack from '../../layout/Stack.svelte'
    import Heading from '../../type/Heading.svelte'
    import Load from '../Load.svelte'
    import { cart, total } from '../../../stores/cart'
    import Amount from './Amount.svelte'
    import Icon from '../Icon.svelte'
    import Button from '../Button.svelte'

    export let id, amount

    let product, message
    let initial = amount
    let current = amount
    let currency
    let price

	const fetchProduct = async () => {
		const res = await getProduct({ product_id: id })
		if (res.body.product) {
            product = res.body.product
            currency = product.currency ? product.currency : 'NOK'
            price = product.price * initial
            total.set(id, price, currency)
        }
		else if (res.body.error) message = res.body.error.message
	}

    const updateAmount = e => {
        const val = e.target.value
        let num = 1
        const str = val + ''
        const limit = '^[1-9][0-9]?$|^100$'
        const integer = '^[0-9]+$'
        
        if (val === '') {
            e.target.value = 1
            num = 1
        }
        else if (!str.match(limit)) {
            if (str.match(integer)) {
                const int = parseInt(str)
                num = Math.max(1, Math.min(100, int))
                e.target.value = num
            }
            else e.target.value = current

        }
        else num = parseInt(val)
        
        current = num
        price = product.price * current
        total.set(id, price, currency)
        cart.silent(id, num)
    }

    const removeItem = () => {
        cart.remove(id)
        total.remove(id)
    }

	onMount(() => {
        fetchProduct()
    })
</script>

<div class="item">
	{#if product}
        <div class="split">
            <Stack>
                <div class="flex">
                    <Heading type="h3">{product.name}</Heading>
                    <div class="price">
                        {#if current > 1}
                            <span class="price-per-unit">(per unit {currency} {product.price},-)</span>
                        {/if} 
                        <span class="price-total">{currency} {price},-</span>    
                    </div>
                </div>
                <div class="flex">
                    <div class="description">
                        {product.short_desc}
                    </div>
                    <div class="amount">
                        <Amount id="cart-item-amount-{id}" value={initial} input={updateAmount}/>
                    </div>
                </div>
            </Stack>
            <div class="bin">
                <button class="bin-button" on:click={removeItem}>
                    <Icon sprite="bin" />
                </button>
            </div>
        </div>
    {:else}
        <Container center>
            {#if message}
                <p class="error">{message}</p>
                <p>Browse the <a href="/catalogue">Catalogue</a></p>
            {:else}
                <Load />
            {/if}
        </Container>
    {/if}
</div>

<style>
    .item {
        padding: var(--space);
        border-bottom: 1px solid var(--back-lg);
    }

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .split {
        display: grid;
        gap: calc(2 * var(--gap));
        grid-template-columns: 1fr 3rem;
    }

    .bin {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bin-button {
        border: none;
        background: transparent;
    }

    .error {
        color: var(--control-r);
    }

    .price {
        display: flex;
        align-items: center;
    }

    .price-total {
        font-weight: 700;
        font-size: 1.8rem;
    }

    .price-per-unit {
        color: var(--text-g);
        padding-right: 1.2rem;
    }

    .amount {
        display: flex;
        color: var(--text-g);
    }
</style>
