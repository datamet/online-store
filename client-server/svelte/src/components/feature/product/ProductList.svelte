<script>
import Product from "./Product.svelte";

    export let products = [
        {
            _id: "aldsjfivdojølvd",
            name: "GoPro Hero 8 Black",
            short_desc: "The newest gopro with style",
            price: "$340.00"
        },
        {
            _id: "dfasødjfio",
            name: "AirTag",
            short_desc: "The newest gopro with style",
            price: "$8.00"
        },
        {
            _id: "dfadfadsasødjfio",
            name: "AirTag",
            short_desc: "The newest gopro with style",
            price: "$8.00"
        },
        {
            _id: "dfasahghasfødjfio",
            name: "AirTag",
            short_desc: "The newest gopro with style",
            price: "$8.00"
        },
        {
            _id: "dfasø34tgfdjfio",
            name: "AirTag",
            short_desc: "The newest gopro with style",
            price: "$8.00"
        },
        {
            _id: "dfasødjagds3fio",
            name: "AirTag",
            short_desc: "The newest gopro with style",
            price: "$8.00"
        },
        {
            _id: "jagds3fio",
            name: "AirTag",
            short_desc: "The newest gopro with style",
            price: "$8.00"
        },
        {
            _id: "afdadfasødjagds3fio",
            name: "AirTag",
            short_desc: "The newest gopro with style",
            price: "$8.00"
        }
    ]
</script>

<div class="list">
    {#each products as product (product._id)}
        <Product>
            <span slot="title">{product.name}</span>
            <span slot="description">{product.short_desc}</span>
            <span slot="price">{product.price}</span>
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