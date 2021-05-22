<script>
	import Input from './Input.svelte'
	import Form from './Form.svelte'
	import FormGroup from './FormGroup.svelte'
	import {
		validateCountry,
		validateProvince,
		validateCity,
		validateZip,
		validateStreet
	} from '../../../../../api/endpoints'
	import { onMount } from 'svelte';
	import Heading from '../../type/Heading.svelte';
	import FromText from './FromText.svelte';

    const validate = {
        country: validateCountry,
		province: validateProvince,
		city: validateCity,
		zip: validateZip,
		street: validateStreet,
    }

	export let address = {
		country: '',
		province: '',
		city: '',
		zip: '',
		street: '',
	}

	onMount(() => {
		if (!address) address = {
			country: '',
			province: '',
			city: '',
			zip: '',
			street: '',
		}
	})

	const validator = type => async val => {
		const obj = {}
		obj[type] = val
		const res = await validate[type](obj)
		if (res.body.message) return { valid: true }
		return { valid: false, message: res.body.error.message }
	}
</script>

<Form>
	<FormGroup>
		<Heading>Shipping Address</Heading>
		<FromText>Fill in shipping information to continue</FromText>
	</FormGroup>
	<FormGroup>
		<Input
			id="order-country"
			bind:value={address.country}
			type="text"
			initial="{address.country}"
			validator={validator('country')}>Country</Input
		>
		<Input
			id="order-province"
			bind:value={address.province}
			type="text"
			initial="{address.province}"
			validator={validator('province')}>Province</Input
		>
	</FormGroup>
	<FormGroup grid>
		<Input
			id="order-zip"
			bind:value={address.zip}
			type="text"
			initial="{address.zip}"
			validator={validator('zip')}>Zip</Input
		>
		<Input
			id="order-city"
			bind:value={address.city}
			type="text"
			initial="{address.city}"
			validator={validator('city')}>City</Input
		>
        <Input
			id="order-street"
			bind:value={address.street}
			type="text"
			initial="{address.street}"
			validator={validator('street')}>Street</Input
		>
	</FormGroup>
	<slot />
</Form>

<style>
</style>
