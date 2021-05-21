<script>
    import Heading from "../../type/Heading.svelte"    
    import Button from "../Button.svelte"
    import Stack from '../../layout/Stack.svelte'
    import Address from "./Address.svelte"
    import Payment from "./Payment.svelte"
    import { createOrder } from '../../../../../api/endpoints'
    import { navigate } from 'svelte-routing'
    import { cart } from '../../../stores/cart'

    export let total = 0, currency = 'NOK', cupon = null, address, payment, id
    let completeAddress, completePayment
    let errorMessage = ''

    $: valid = completeAddress && (cupon.percent === 100 || completePayment)

    const purchase = async () => {
        const order = {
            checkout_session: id,
            payment_token: "fake token (this would come from a third party in a situation)",
            address
        }
        if(cupon && cupon.code && cupon.percent) order.cupon = cupon.code
        const res = await createOrder(order)
        if (res.body.message && res.body.order_id) {
            cart.reset()
            navigate(`/order/${res.body.order_id}`)
        }
        else if (res.body.error) errorMessage = res.body.error.message
        else errorMessage = 'Something went wrong'
    }

    const discountPrice = (price, percent) => {
		const factor = (100 - percent) * 0.01
		return price * factor
	}
</script>

<div class="summary">

    <Stack>
        {#if cupon && cupon.code && cupon.percent}
            <div class="cupon">
                <Heading type="h3">Applied cupon:</Heading>
                <p><span class="code">{cupon.code}</span> - {cupon.percent}%</p>
            </div>
        {/if}
        <div class="address">
            <Heading type="h3">Address:</Heading>
            <Address {address} bind:complete={completeAddress}/>
        </div>
        {#if !cupon || !cupon.code || cupon.percent !== 100}
            <div class="payment">
                <Heading type="h3">Payment:</Heading>
                <Payment {payment} bind:complete={completePayment} />
            </div>
        {/if}
        <div class="total">
            <Heading>Total:</Heading>
            {#if cupon && cupon.code && cupon.percent}
                <Heading type="h3"><span class="old-price">{currency} {total},-</span> {currency} {discountPrice(total, cupon.percent)},-</Heading>
            {:else}
                <Heading type="h3">{currency} {total},-</Heading>
            {/if}
        </div>
        <Button disabled={!valid} action={purchase} fill>Purchase</Button>
        {#if errorMessage}
            <span class="error">{errorMessage}</span>
        {/if}
    </Stack>
</div>

<style>
    .summary {
        background-color: var(--back-lg);
        padding: var(--space);
        border-radius: .6rem;
        display: grid;
        gap: 2rem;
    }

    .total {
        border-top: 1px solid var(--back-g);
        padding: var(--gap);
        display: flex;
        align-items: center;
        justify-content: space-between;
        --f-size: 2rem;
    }

    .address {
        --f-size: 1.8rem;
        display: grid;
        gap: 1rem;
    }

    .payment {
        --f-size: 1.8rem;
        display: grid;
        gap: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--back-g);
    }

    .cupon {
        --f-size: 1.8rem;
        border-bottom: 1px solid var(--back-g);
    }

    .code {
        background-color: var(--back-g);
        border-radius: .3rem;
        padding: .1rem .2rem;
    }

    .old-price {
        font-size: 1.5rem;
        font-weight: 400;
        text-decoration: line-through;
    }

    .error {
        color: var(--control-r);
    }
</style>