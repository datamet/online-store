<script>
    import Heading from '../../type/Heading.svelte'
    import { total, cart } from '../../../stores/cart'
    import Button from '../Button.svelte'
    import Stack from '../../layout/Stack.svelte'

    let currency = 'NOK'
    $: totalPrice = $total.reduce((acc, item) => item.price + acc, 0)
    $: disabled = $cart.length === 0

    const checkout = () => {}

</script>

<div class="summary">
    <Stack size="medium">
        <div class="price">
            <Heading>Total</Heading>
            <Heading type="h3">{currency} {totalPrice},-</Heading>
        </div>
        <div>
            <Button action={checkout} {disabled}>Checkout</Button>
        </div>
    </Stack>
</div>

<style>
    .summary {
        background-color: var(--back-lg);
        border-radius: .3rem;
        padding: calc(1.5* var(--space));
    }

    .price {
        display: flex;
        --f-size: 2.5rem;
        justify-content: space-between;
    }
</style>