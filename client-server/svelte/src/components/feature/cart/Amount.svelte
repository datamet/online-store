<script>
    let message

    export let value, id, input = e => {
        let val = e.target.value
        if (isNaN(val)) return
        value = val
    }

	const handleInput = e => {
		input(e)
	}
</script>

<div class="amount">
    <label for="{id}"></label>
    <input {id} type="number" min="1" max="100" {value} on:change={handleInput}>
</div>

<style>
    .amount {
        text-align: right;
    }

    input {
        font-size: 1.6rem;
        width: 6rem;
        border-radius: .3rem;
        padding: .2rem .4rem;
        border: 1px solid var(--back-lg);
    }
</style>