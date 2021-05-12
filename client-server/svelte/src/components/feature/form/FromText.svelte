<script>

</script>

<div><slot /></div>

<style>
    div {
        font-size: 1.3rem;
    }

    div > :global(span) {
        margin-right: .5rem;
    }

    div > :global(:last-child) {
        margin-right: 0;
    }
</style>