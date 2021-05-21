<script>
    export let size = 'small'
</script>

<div class="stack {size}">
    <slot />
</div>

<style>
    .stack {
        display: grid;
        gap: var(--gap) 0;
    }

    .medium {
        gap: calc(2 * var(--gap)) 0;
    }
</style>