<script>
    import Heading from '../../type/Heading.svelte'
    import { total, cart } from '../../../stores/cart'
    import Button from '../Button.svelte'
    import Stack from '../../layout/Stack.svelte'
    import { createCheckoutSession } from '../../../../../api/endpoints'
    import { navigate } from 'svelte-routing'

    let currency = 'NOK'
    let errorMessage = ''
    $: totalPrice = $total.reduce((acc, item) => item.price + acc, 0)
    $: disabled = ($cart && $cart.length === 0) || !$cart

    const checkout = async () => {
        const res = await createCheckoutSession({ products: $cart })
        if (res.body.checkout_id) navigate(`/checkout/${res.body.checkout_id}`)
        else errorMessage = res.body.errorMessage
    }

</script>

<div class="summary">
    <Stack size="medium">
        <div class="price">
            <Heading>Total</Heading>
            <Heading type="h3">{currency} {totalPrice},-</Heading>
        </div>
        <div>
            <Button action={checkout} {disabled}>Checkout</Button>
            <p class="error">{errorMessage}</p>
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

    .error {
        color: var(--control-r)
    }
</style>