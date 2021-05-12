<script>
    export let contain = false, content = false, center = false
</script>

<div class="container" class:contain class:content class:center>
    <slot />
</div>

<style>
    .container {
        margin: 0 auto;
        padding: 0 var(--space);
    }

    .content {
        padding: var(--space);
    }

    .contain {
        max-width: 120rem;
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>