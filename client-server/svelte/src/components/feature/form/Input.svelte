<script>
	import Icon from '../Icon.svelte'

	export let type = 'text',
		validator = () => true,
		id,
		value = '',
		placeholder

	let error, success, val

	const validate = async v => {
		const valid = await validator(v)
		if (valid) {
			value = v
			success = true
			error = false
		} else {
			value = ''
			success = false
			error = true
		}
	}

	let timeout
	const handleInput = e => {
		val = e.target.value
		let ms = timeout ? 500 : 700
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			validate(e.target.value)
		}, ms)
	}
</script>

<div class="group">
	<input
		class="input"
		{id}
		{type}
		on:input={handleInput}
	/>
	<label class="label" class:val for={id}><slot /></label>
	<div class="icon" class:success class:error>
        <Icon sprite="{success || error ? success ? 'check' : 'notice' : ''}"/>
    </div>
</div>

<style>
	.group {
        position: relative;
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
		width: 25rem;
		max-width: 25rem;
		line-height: 3rem;
		border-radius: 0.3rem;
		padding: 1px 1rem;
		border: 1px solid var(--text-g);
		max-width: 100%;
	}

    .icon.error {
        color: var(--control-r);
    }

    .icon.success {
        color: var(--control-g);
    }

	.input:focus {
		padding: 0 1rem;
		border: 2px solid var(--control-y);
	}
</style>
