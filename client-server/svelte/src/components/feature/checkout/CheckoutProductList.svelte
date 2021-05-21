<script>
    import Container from '../../layout/Container.svelte'
    import CheckoutProduct from './CheckoutProduct.svelte'
    import Load from '../Load.svelte'

    export let products, error, percent = 0
</script>

{#if products}
    <ul>
        {#each products as product (product._id)}
            <li>
                <CheckoutProduct {product} {percent} />
            </li>
        {/each}
    </ul>
{:else if !error}
    <Container center section>
        <Load />
    </Container>
{/if}

<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
</style>