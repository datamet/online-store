<script>
import Product from "./Product.svelte";

    export let products = []
</script>

<div class="list">
    {#each products as product (product._id)}
        <Product id={product._id} image={product.images && product.images.length > 0 ? product.images[0] : null}>
            <span slot="title">{product.name}</span>
            <span slot="description">{product.short_desc}</span>
            <span slot="price">{product.currency ? product.currency : 'NOK'} {product.price},-</span>
        </Product>
    {/each}
</div>

<style>
    .list {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
        gap: 4rem;
    }
</style>