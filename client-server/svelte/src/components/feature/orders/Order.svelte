<script>
    import Stack from '../../layout/Stack.svelte'
    import Heading from '../../type/Heading.svelte'
    import Address from '../checkout/Address.svelte'

    export let order

</script>

{#if order}
    <div class="grid">
        <Stack size="medium">
            <Heading>Products ordered</Heading>
            <div class="product-grid">
                <Heading>Product</Heading>
                <Heading>Price</Heading>
                <Heading>Amount</Heading>
                {#each order.products as product (product._id)}
                    <span>{product.name}</span>
                    {#if product.amount > 0}
                        <span>NOK {product.price},-</span>
                    {:else}
                        <span>(per unit NOK {product.price},-) <span class="bold">NOK {product.price * product.amount},-</span></span>
                    {/if}
                    <span>{product.amount}</span>
                {/each}  
            </div>
        </Stack>
        <div class="hollow-card">
            <Stack>
                <div>
                    <Heading type="h3">Total price</Heading>
                    <p>NOK {order.total_price},-</p>
                </div>
                <div>
                    <Heading type="h3">Order status</Heading>
                    <p>{order.status}</p>
                </div>
                {#if order.cupon}
                    <div>
                        <Heading type="h3">Cupon used</Heading>
                        <p><span class="code">{order.cupon}</span> - {order.discount}%</p>
                    </div>
                {/if}
                <div>
                    <Heading>Address</Heading>
                    <Address address={order.address} />
                </div>
            </Stack>
        </div>
    </div>
{/if}

<style>
    .product-grid {
        --f-size: 1.8rem;
        display: grid;
        grid-template-columns: 1fr max-content max-content;
        gap: 2rem;
    }

    .code {
        background-color: var(--back-lg);
        border-radius: .3rem;
        padding: .1rem .2rem;
    }

    .hollow-card {
        padding: var(--space);
        border-radius: .6rem;
        border: 1px solid var(--back-lg);
        --f-size: 2.2rem;
    }

    .grid {
        display: grid;
        gap: 4rem;
        grid-template-columns: 1fr;
        align-items: flex-start;
    }

    @media (min-width: 62.25em) {
        .grid {
            grid-template-columns: 1fr 40rem;
        }
    }

    .bold {
        font-weight: 700;
    }
</style>