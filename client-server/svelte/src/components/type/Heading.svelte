<script>
    export let type = 'h2', light = false, center = false
</script>

{#if type === 'h1'}
    <h1 class:light class:center>
        <slot />
    </h1>
{:else if type === 'h2'}
    <h2 class:light class:center>
        <slot />
    </h2>
{:else if type === 'h3'}
    <h3 class:light class:center>
        <slot />
    </h3>
{/if}



<style>
    h1,
    h2,
    h3 {
        font-size: var(--f-size);
        font-family: var(--f-type);
        margin: 0;
    }

    .light {
        font-weight: 400;
    }

    .center {
        text-align: center;
    }
</style>