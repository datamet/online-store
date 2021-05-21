<script>
	import Input from './Input.svelte'
	import Form from './Form.svelte'
	import FormGroup from './FormGroup.svelte'
	import { onMount } from 'svelte'
import Heading from '../../type/Heading.svelte'
import FromText from './FromText.svelte'

	export let payment = {
		first_name: '',
		last_name: '',
		cart: '',
		cvc: '',
		exp: ''
	}

	onMount(() => {
		if (!payment) address = {
            first_name: '',
            last_name: '',
            cart: '',
            cvc: '',
            exp: ''
        }
	})

	const validator = async val => {
		return true
	}
</script>

<Form>
    <FormGroup>
        <Heading>Payment Information</Heading>
        <FromText>Fill inn payment information to continue.</FromText>
    </FormGroup>
	<FormGroup grid>
		<Input
			id="order-payment-first-name"
			bind:value={payment.first_name}
			type="text"
			validator={validator}>First Name</Input
		>
		<Input
			id="order-payment-last-name"
			bind:value={payment.last_name}
			type="text"
			validator={validator}>Last Name</Input
		>
	</FormGroup>
	<FormGroup grid>
		<Input
			id="order-payment-card"
			bind:value={payment.card}
			type="text"
			validator={validator}>Card Number</Input
		>
		<Input
			id="order-payment-cvc"
			bind:value={payment.cvc}
			type="text"
			validator={validator('city')}>Security Code</Input
		>
        <Input
			id="order-payment-exp"
			bind:value={payment.exp}
			type="text"
			validator={validator('street')}>Card Expiration (MM/YY)</Input
		>
	</FormGroup>
	<slot />
</Form>

<style>
</style>
