<script>
	import { onMount } from 'svelte'
    import { getOrders } from '../../../api/endpoints'
	import { navigate, link } from 'svelte-routing'
	import Button from '../components/feature/Button.svelte'
	import Form from '../components/feature/form/Form.svelte'
	import FormGroup from '../components/feature/form/FormGroup.svelte'
	import Input from '../components/feature/form/Input.svelte'
	import Container from '../components/layout/Container.svelte'
	import Stack from '../components/layout/Stack.svelte'
	import Heading from '../components/type/Heading.svelte'
	import { user } from '../stores/user'

	let order_id
    let orders = []
    let errorMessage = ''

	const orderValidator = async () => {
		return true
	}

	const fetchOrders = async () => {
        const res = await getOrders({ user_id: $user.user_id })
        if (res.body.orders) orders = res.body.orders
        else if (res.body.error) errorMessage = res.body.error.message
        else errorMessage = 'Something went wrong'
    }

    $: if($user) fetchOrders()
</script>

{#if $user}
	<Container section contain>
        {#if !errorMessage && orders && orders.length > 0}
            <Stack size="medium">
                <Heading>Products ordered</Heading>
                <p>Here you can see all your orders in one place. Click on one to get more information.</p>
                <div>
                    <div class="order-grid padding">
                        <Heading>Date</Heading>
                        <Heading>Total price</Heading>
                        <Heading>Status</Heading>
                    </div>
                    {#each orders as order (order._id)}
                        <a class="order-link" use:link href="/order/{order._id}">
                            <div class="order-grid">
                                <span>{order.date}</span>
                                <span>NOK {order.total_price},-</span>
                                <span>{order.status}</span>
                            </div>
                        </a>
                    {/each}
                </div>
            </Stack>
        {:else if !errorMessage && orders && orders.length === 0}
            <Container center contain>
                <Stack size="medium">
                    <Heading center>No orders found</Heading>
                    <span>You haven't ordered any products yet. Browse the <a use:link href="/catalogue">catalogue</a> to find something to order.</span>
                </Stack>
            </Container>
        {:else}
            <Container center contain>
                <Stack size="medium">
                    <Heading>Oops</Heading>
                    <span>{errorMessage}</span>
                </Stack>
            </Container>
        {/if}
    </Container>
{:else}
	<Container section contain>
		<div class="hollow-card">
			<Stack size="medium">
				<div>
					<Heading>Find an order</Heading>
					<p>
						This page helps you find old orders. Paste in your order
						id bellow and we will search for it. If your order was
						placed while signed in, you can find it by <a
							use:link
							href="/signin">signing in</a
						>.
					</p>
				</div>
				<Form>
					<FormGroup grid>
						<Input
							id="order-id"
							type="text"
							validator={orderValidator}
							bind:value={order_id}>Order Id</Input
						>
						<Button action={() => navigate(`/order/${order_id}`)}
							>Find order</Button
						>
					</FormGroup>
				</Form>
			</Stack>
		</div>
	</Container>
{/if}

<style>
    .padding {
        padding: var(--space);
    }

	.hollow-card {
		padding: var(--space);
		border-radius: 0.6rem;
		border: 1px solid var(--back-lg);
		--f-size: 2.2rem;
	}

	a:link,
	a:visited {
		color: var(--text-y);
	}

    .order-grid {
        --f-size: 1.8rem;
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr 15rem 10rem;
        gap: 2rem;
    }
    
    .order-link:link, .order-link:visited {
        display: block;
        padding: var(--space);
        text-decoration: none;
        color: var(--text-g);
        border-radius: .3rem;
    }

    .order-link:hover {
        background-color: var(--back-lg);
    }
</style>
