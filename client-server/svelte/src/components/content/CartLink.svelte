<script>
    import Link from '../feature/Link.svelte'
    import Icon from '../feature/Icon.svelte'
    import { cart } from '../../stores/cart'
    import { onDestroy } from 'svelte'

    let amount
    const unsub = cart.subscribe(() => {
        amount = cart.number()
    })

    onDestroy(() => {
        unsub()
    })

</script>

<div class="container">
    <Link to="/cart">
        <Icon sprite="cart" />
    </Link>
    {#if amount > 0}
        <div class="number">{amount}</div>
    {/if}
</div>

<style>
    .container {
        position: relative;
    }

    .number {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.8rem;
        height: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        border-radius: 50%;
        background-color: var(--back-y);
    }
</style>