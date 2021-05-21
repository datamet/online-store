<script>
	import Container from '../components/layout/Container.svelte'
	import { onMount } from 'svelte'
	import { getCheckoutSession } from '../../../api/endpoints'
	import CheckoutProductList from '../components/feature/checkout/CheckoutProductList.svelte'
	import TabSelector from '../components/feature/tabs/TabSelector.svelte'
	import Stack from '../components/layout/Stack.svelte'
	import { Router, Route, navigate, link } from 'svelte-routing'
	import Summary from '../components/feature/checkout/Summary.svelte'
	import ShippingForm from '../components/feature/form/ShippingForm.svelte'
	import FormGroup from '../components/feature/form/FormGroup.svelte'
	import Button from '../components/feature/Button.svelte'
	import PaymentForm from '../components/feature/form/PaymentForm.svelte'
	import CuponSelector from '../components/feature/checkout/CuponSelector.svelte'
	import { addressStore, cuponStore } from '../stores/checkout'
	import Heading from '../components/type/Heading.svelte'

	export let id
	let products,
		exp,
		total,
		checkoutError,
		productError = ''
	let path = window.location.pathname
		.split('/')
		.filter(segment => segment || false)
	let segment = path.length === 3 ? path[path.length - 1] : 'shipping'
	let selected = path.length === 3 ? segment : 'shipping'
	let address = $addressStore
	$: validAddress =
		address &&
		address.country &&
		address.province &&
		address.city &&
		address.zip &&
		address.street
	let payment
	let cupon = $cuponStore
	$: validPayment = payment || cupon.percent === 100

	$: navigate(
		`/checkout/${id}/${selected ? selected.toLowerCase() : segment}`
	)

	$: addressStore.set(address)
	$: cuponStore.set(cupon)

	const fetchSession = async () => {
		const res = await getCheckoutSession({ checkout_id: id })
		if (res.body.products) products = res.body.products
		if (res.body.exp) exp = res.body.exp
		if (res.body.total) total = res.body.total
		if (res.body.error) checkoutError = res.body.error.message
	}

	onMount(() => {
		navigate(`/checkout/${id}/${segment}`)
		fetchSession()
	})
</script>

{#if !checkoutError}
	<Container contain content narrow>
		<Stack size="medium">
			<TabSelector
				tabs={['Shipping', 'Payment', 'Summary']}
				bind:selected
			/>
			<Router basepath="/checkout/:checkout_id">
				<Route path="/shipping">
					<Container content>
						<ShippingForm bind:address>
							<FormGroup right>
								<Button
									disabled={!validAddress}
									action={() =>
										navigate(`/checkout/${id}/payment`)}
									>Next</Button
								>
							</FormGroup>
						</ShippingForm>
					</Container>
				</Route>
				<Route path="/payment">
					<Container content>
						<Stack size="medium">
							<CuponSelector
								bind:code={cupon.code}
								bind:percent={cupon.percent}
								{total}
							/>
							<Container section>
								<Stack size="medium">
									{#if cupon.percent !== 100}
										<PaymentForm />
									{:else}
										<Container center>
											<Heading>No payment needed</Heading>
											<p>
												We don't collect payment
												information for free orders :)
											</p>
										</Container>
									{/if}
									<Container section>
										<FormGroup flex>
											<Button
												action={() =>
													navigate(
														`/checkout/${id}/shipping`
													)}>Previous</Button
											>
											<Button
												disabled={!validPayment}
												action={() =>
													navigate(
														`/checkout/${id}/summary`
													)}>Next</Button
											>
										</FormGroup>
									</Container>
								</Stack>
							</Container>
						</Stack>
					</Container>
				</Route>
				<Route path="/summary">
					<Container section>
						<Stack size="medium">
							<div class="summary">
								<div>
									<CheckoutProductList
										{products}
										error={productError}
										percent={cupon.percent || 0}
									/>
									<span class="error">{productError}</span>
								</div>
								<Summary
									{total}
									{address}
									{cupon}
									{payment}
									{id}
								/>
							</div>
							<Container section>
								<FormGroup>
									<Button
										action={() =>
											navigate(`/checkout/${id}/payment`)}
										>Previous</Button
									>
								</FormGroup>
							</Container>
						</Stack>
					</Container>
				</Route>
			</Router>
		</Stack>
	</Container>
{:else}
	<Container contain section center narrow>
		<Heading>Oops!</Heading>
		<p class="error">
			We could not find that checkout session. You might already have
			completed your purchase, in witch case you can find your order <a
				class="link"
				use:link
				href="/orders">here</a
			>. Otherwise, go to your
			<a class="link" use:link href="/cart">cart</a> and checkout again.
		</p>
	</Container>
{/if}

<style>
	.summary {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
	}

	@media (min-width: 62.25em) {
		.summary {
			grid-template-columns: 1fr 35rem;
		}
	}

	.error {
		text-align: center;
		line-height: 1.6em;
	}

	.link:link,
	.link:visited {
		color: var(--text-y);
	}
</style>
