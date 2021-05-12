<script>
    export let type = 'h2', light = false
</script>

{#if type === 'h1'}
    <h1 class:light>
        <slot />
    </h1>
{:else if type === 'h2'}
    <h2 class:light>
        <slot />
    </h2>
{:else if type === 'h3'}
    <h3 class:light>
        <slot />
    </h3>
{/if}



<style>
    h1,
    h2,
    h3,
    h4 {
        font-size: var(--f-size);
        font-family: var(--f-type);
        margin: 0;
    }

    .light {
        font-weight: 400;
    }
</style>