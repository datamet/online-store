<script>
	import Button from '../Button.svelte'
    import Form from '../form/Form.svelte'
	import FormGroup from '../form/FormGroup.svelte'
	import Input from '../form/Input.svelte'
    import { validCupon, validPercent } from '../../../../../api/endpoints'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let code, percent

    $: valid = code && percent

    const validCode = async code => {
        const res = await validCupon({ discount_code: code })
        if (res.body.message) return { valid: true }
        else if (res.body.error) return { valid: false, message: res.body.error.message }
        return { valid: false, message: 'Something went wrong' }
    }

    const percentValid = async percent => {
        const res = await validPercent({ percent })
        if (res.body.message) return { valid: true }
        else if (res.body.error) return { valid: false, message: res.body.error.message }
        return { valid: false, message: 'Something went wrong' }
    }

    const handleClick = () => {
        dispatch('code', { code, percent })
    }

</script>

<Form>
	<FormGroup grid>
		<Input type="text" validator={validCode} bind:value={code}>Discount Code</Input>
		<Input type="text" validator={percentValid} bind:value={percent}>Percent</Input>
        <Button disabled={!valid} action={handleClick}>Add discount code</Button>
	</FormGroup>
</Form>

<style>
</style>
