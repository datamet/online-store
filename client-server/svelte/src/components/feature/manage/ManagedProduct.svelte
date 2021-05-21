<script>
    import { createEventDispatcher } from 'svelte'
    import { navigate } from 'svelte-routing'
    import Button from '../Button.svelte'

    const dispatch = createEventDispatcher()

    const handleDelete = () => dispatch('delete', { product_id: product._id })

    const handleEdit = () => {
        navigate(`/manage/product/${product._id}/edit`)
    }

    export let product
</script>

<div>{product.name}</div>
<div>{product.stock}</div>
<div>{product.sold || 0}</div>
<div></div>
<div class="flex gap">
        <!-- <Button action={handleEdit}>Edit</Button> -->
        <Button color="red" action={handleDelete}>Delete</Button>
</div>

<style>    
    .flex {
        display: flex;
        align-items: center;
    }
</style>