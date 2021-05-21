<script>
    import Icon from '../Icon.svelte'
    export let address, complete = false

    $: complete = address && address.street && address.zip && address.city && address.province && address.country
</script>

{#if complete}
    <div>
        <p>{`${address.street}, ${address.zip} ${address.city}`}</p>
        <p>{`${address.province}, ${address.country}`}</p>
    </div>
{:else}
    <div class="error">
        <Icon sprite="notice"/><span>Invalid address</span>
    </div>
{/if}

<style>
    p {
        margin: 0;
        padding: 0;
    }

    .error {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--control-r);
    }
</style>