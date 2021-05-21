<script>
    import ManagedProduct from './ManagedProduct.svelte'
    import { deleteProduct } from '../../../../../api/endpoints'
    import { message } from '../../../stores/toast'

    export let products

    const handleDelete = async event => {
        const res = await deleteProduct({ product_id: event.detail.product_id })
        if (res.body.message) {
            $message = res.body.message
            products = products.filter(product => product._id !== event.detail.product_id)
        }
        else if (res.body.error) $message = res.body.error.message
        else $message = 'Something went wrong'
    }
</script>

<div class="grid">
    <h3 class="title">Product</h3>
    <h3 class="title">Stock</h3>
    <h3 class="title">Sold</h3>
    <span></span>
    <h3 class="title">Actions</h3>
    {#each products as product (product._id)}
        <ManagedProduct on:delete={handleDelete} {product} />
    {/each}
</div>

<style>
    .grid {
        display: grid;
        gap: 1rem 2rem;
        grid-template-columns: repeat(3, auto) 1fr max-content;
        align-items: center;
    }

    @media (min-width: 50em) {
        .grid {
            gap: 2rem 4rem;
        }
    }
</style>