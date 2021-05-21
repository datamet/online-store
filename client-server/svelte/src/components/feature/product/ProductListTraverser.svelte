<script>
    import Button from "../Button.svelte";
    export let previous, next, fetch
</script>

<div class="flex">
    <Button disabled={previous ? false : true} action={() => fetch(previous)}>Previous</Button>
    <Button disabled={next ? false : true} action={() => fetch(next)}>Next</Button>
</div>

<style>
    .flex {
        padding-top: 2rem;
        border-top: 1px solid var(--back-lg);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>