<script>
    import Input from '../form/Input.svelte'
	import Form from '../form/Form.svelte'
	import { validateDiscount } from '../../../../../api/endpoints'
	import FormGroup from '../form/FormGroup.svelte'
	import Stack from '../../layout/Stack.svelte'
	import Heading from '../../type/Heading.svelte'

    export let code = '', percent = null, total = 0

    const validator = async discount_code => {
		const res = await validateDiscount({ discount_code })
		if (res.body.valid) {
			percent = res.body.percent
			return { valid: true }
		}
		else if (res.body.message) {
			percent = null
			return { valid: false, message: res.body.message }
		}
		percent = null
		return { valid: false, message: 'Invalid cupon' }
    }

	const discountPrice = (price, percent) => {
		const factor = (100 - percent) * 0.01
		return price * factor
	}


</script>

<div class="container">
	<Stack>
		<div>
			<Heading>Have a cupon code?</Heading>
			<p>Enter it bellow to check it's validity</p>
			<p>(Hint: Try code "alfred")</p>
		</div>
		<Form>
			<FormGroup>
				<Input
					id="order-cupon"
					bind:value={code}
					type="text"
					initial={code}
					validator={validator}>Cupon Code</Input
				>
			</FormGroup>
		</Form>
	</Stack>
	<div class="percent">
		{#if percent}
			<h4>{percent}%</h4>
			<p>New price: NOK {discountPrice(total, percent)},-</p>

		{:else}
			<h4>Total</h4>
			<p>NOK {total},-</p>
		{/if}
	</div>
</div>

<style>
	.container {
		background-color: var(--back-lg);
		padding: var(--space);
		border-radius: .6rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;
	}

	@media (min-width: 62.25em) {
		.container {
			grid-template-columns: 1fr 1fr;
		}
	}

	.percent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.percent h4 {
		font-size: 3.3rem;
		margin: 0;
	}

	.percent p {
		margin: 0;
		font-size: 1.8rem;
	}
</style>
