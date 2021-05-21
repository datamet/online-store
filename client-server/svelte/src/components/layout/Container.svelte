<script>
    export let contain = false, content = false, center = false, section = false, size="medium", narrow = false, nopadding = false
</script>

<div class="container {size}" class:nopadding class:contain class:content class:center class:section class:narrow>
    <slot />
</div>

<style>
    .container {
        width: 100%;
        margin: 0 auto;
        padding: 0 var(--space);
    }

    .nopadding {
        padding: 0;
    }

    .content {
        padding-top: var(--space);
        padding-bottom: var(--space);
    }

    .section {
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .section.small {
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
    }

    .contain {
        max-width: 120rem;
    }

    .contain.narrow {
        max-width: 80rem;
    }

    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>