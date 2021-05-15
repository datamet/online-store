<script>
    export let contain = false, content = false, center = false, section = false
</script>

<div class="container" class:contain class:content class:center class:section>
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

    .section {
        padding-top: 5rem;
        padding-bottom: 5rem;
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