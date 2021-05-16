<script>
	import Heading from '../../type/Heading.svelte'
    import Container from '../../layout/Container.svelte'
    import CartItem from './CartItem.svelte'
    import { link } from 'svelte-routing'

    export let cart = []
    

    

</script>

<div class="list">
    {#if cart && cart.length > 0}
        {#each cart as item (item.product_id)}
            <CartItem id={item.product_id} amount={item.amount}/>
        {/each}
    {:else}
        <Container center section size="small">
            <Heading type="h3">Cart is empty</Heading>
            <p>Browse the <a class="link" use:link href="/catalogue">catalogue</a></p>
        </Container>
    {/if}
</div>

<style>
    .list {
        --f-size: 2.5rem;
    }

    .link:link, .link:visited {
        color: var(--text-y);
    }
</style>
