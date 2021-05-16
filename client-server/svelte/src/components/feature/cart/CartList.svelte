<script>
	import Heading from '../../type/Heading.svelte'
    import Container from '../../layout/Container.svelte'
    import CartItem from './CartItem.svelte'
    export let cart = []

    

</script>

<div class="list">
    {#if cart && cart.length > 0}
        {#each cart as item (item.product_id)}
            <CartItem id={item.product_id} amount={item.amount}/>
        {/each}
    {:else}
        <Container center>
            <Heading type="h3">Cart is empty</Heading>
        </Container>
    {/if}
</div>

<style>
    .list {
        --f-size: 2.5rem;
    }

</style>
