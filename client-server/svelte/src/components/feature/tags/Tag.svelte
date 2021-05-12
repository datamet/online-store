<script>
	import { createEventDispatcher } from 'svelte'
	import Icon from '../Icon.svelte'

	export let checked = false, name
	const dispatch = createEventDispatcher()

	const handleEvent = () => {
		dispatch('change', {
			tag: name,
			checked
		})
	}

</script>

<label class="gap">
	<input type="checkbox" bind:checked={checked} on:change={handleEvent}/>
	<span class="checkbox"><Icon sprite="{checked ? 'checkmark' : ''}" /></span>
	{name}
</label>

<style>
	label {
		background-color: var(--back-y);
        padding: .5rem 1.5rem .5rem .7rem;
        border-radius: 10rem;
		display: flex;
		position: relative;
		cursor: pointer;
	}

	input {
        opacity: 0;
		cursor: pointer;
	}

	.checkbox {
		top: 50%;
		left: .6rem;
		transform: translateY(-50%);
		position: absolute;
		width: 2rem;
		height: 2rem;
		background-color: red;
		border-radius: 50%;
		background-color: white;
	}

	label input:checked ~ .checkbox {
		padding: .15rem;
		--i-size: 1.7rem;
	}
</style>
