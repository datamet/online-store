<script>
	import CartList from '../components/feature/cart/CartList.svelte'
	import Container from '../components/layout/Container.svelte'
	import { cart } from '../stores/cart'
    import CartSummary from '../components/feature/cart/CartSummary.svelte'

</script>

<Container contain section>
	<div class="cart">
		<CartList cart={$cart} />
        <CartSummary />
	</div>
</Container>

<style>
    .cart {
        display: grid;
        align-items: flex-start;
        gap: 4rem;
        grid-template-columns: 1fr;
    }

    @media (min-width: 62.25em) {
        .cart {
            grid-template-columns: 1fr 35rem;
        }
    }
</style>
