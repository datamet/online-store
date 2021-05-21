<script>
	import Icon from '../Icon.svelte'
	import { onMount } from 'svelte'	
	import FromText from './FromText.svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let type = 'text',
		validator = null,
		id,
		value = '',
		initial = '',
		revalidate = null,
		required = false,
		readonly = false,
		clear

	let error, success, val, message, input

	onMount(() => {
		revalidate = () => setTimeout(() => validate(val), 10)
		if (!validator && required) validator = v => v ? true : false
		val = value
		if (initial) validate(val)
		clear = () => {
			input.value = ''
		}
	})

	const validate = async v => {
		const res = await validator(v)
		let valid
		if (typeof res === 'object') ({ valid, message } = res)
		else valid = res
		if (valid) {
			value = v
			if (typeof res === 'object') success = true
			error = false
			message = ''
		} else {
			value = ''
			success = false
			if (typeof res === 'object') error = true
		}
	}

	let timeout
	const handleInput = e => {
		val = e.target.value
		if (!validator) {
			value = e.target.value
			return
		}
		let ms = timeout ? 500 : 700
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			validate(e.target.value)
		}, ms)
	}

	const handleKeypress = e => {
		if (e.keyCode === 13) dispatch('enter')
	}
</script>

<div>
	<div class="group">
		<input
			on:keydown={handleKeypress}
			bind:this={input}
			class="input"
			class:readonly
			{id}
			{type}
			{readonly}
			value={initial}
			on:input={handleInput}
		/>
		<label class="label" class:val for={id}><slot /></label>
		<div class="icon" class:success class:error>
			<Icon sprite="{readonly ? 'lock' : success || error ? success ? 'check' : 'notice' : ''}"/>
		</div>
	</div>
	{#if message}
		<FromText error>{message}</FromText>
	{/if}
</div>

<style>
	.group {
        position: relative;
		width: 25rem;
		width: 100%;
	}

    .icon {
        --i-size: 1.8rem;
        position: absolute;
        right: .7rem;
        top: 50%;
        transform: translateY(-40%);
    }

	.label {
		position: absolute;
        left: 1rem;
        top: 50%;
        font-size: 1.3rem;
        transform: translateY(-50%);
        transition: .2s ease-in-out;
	}

	.label.val,
	.input:focus + .label {
        top: 0;
        background-color: white;
        padding: 0 .3rem;
        transition: .2s ease-in-out;
        font-size: 1rem;
    }

	.input {
		width: 100%;
		line-height: 3rem;
		border-radius: 0.3rem;
		padding: 1px 1rem;
		border: 1px solid var(--text-g);
		max-width: 100%;
	}

	.readonly {
		color: gray;
	}

    .icon.error {
        color: var(--control-r);
    }

    .icon.success {
        color: var(--control-g);
    }

	.input:not(.readonly):focus {
		padding: 0 1rem;
		border: 2px solid var(--control-y);
	}
</style>
