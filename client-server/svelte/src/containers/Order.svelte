<script>
	import { onMount } from 'svelte'
	import { getOrder } from '../../../api/endpoints'
	import Order from '../components/feature/orders/Order.svelte'
    import Container from '../components/layout/Container.svelte'
    import Stack from '../components/layout/Stack.svelte'
    import Heading from '../components/type/Heading.svelte'
    import { user } from '../stores/user'
    import { link } from 'svelte-routing'

	export let id

	let order, errorMessage = ''

	const fetchOrder = async () => {
		const res = await getOrder({ order_id: id })
		if (res.body.order) order = res.body.order
		else if (res.body.error) errorMessage = res.body.error.message
		else errorMessage = 'Something went wrong'
	}

	onMount(() => {
		fetchOrder()
	})
</script>

{#if !errorMessage}
    <Container section contain>
        <div class="card">
            <div class="flex gap">
                <Stack size="medium">
                    <Heading>Order confirmed</Heading>
                    <p>
                        <span>Thank you for your purchase. </span>
                        {#if $user}
                            <span>You can view all your orders by going to the <a use:link href="/orders">order</a> page. All the information specified bellow will also be sent to your email: <span class="bold">{$user.email}</span></span>
                        {:else}
                            <span>You can use the order id bellow to view your order at a later date.</span>
                        {/if}
                    </p>
                </Stack>
                <img class="img" src="/assets/shipping.svg" alt="Products">
            </div>
        </div>
    </Container>
    <Container section contain content>
        <Container>
            <Order {order} />
        </Container>
    </Container>
{:else}
    <Container section center>
        <Heading>Oops</Heading>
        {#if $user}
            <p>We could not find this order. If this order was placed with another account you need to sign out and back in with that account.</p>
        {:else}
            <p>We could not find this order. If you were signed in while ordering, you need to <a use:link href="/signin">signin</a> to view your order.</p>
        {/if}
    </Container>
    {/if}

<style>
    .card {
        padding: calc(var(--space) * 1.5);
        background-color: var(--back-lg);
        border-radius: .6rem;
    }

    .bold {
        font-weight: 700;
    }

    a:link, a:visited {
        color: var(--text-y);
    }

    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .img {
        max-width: 30rem;
    }

</style>
