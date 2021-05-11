<script>
    export let center = false, flex = false
</script>

<div class="group" class:center class:flex>
    <slot />
</div>

<style>
    .group {
        display: flex;
        flex-direction: column;
        gap: var(--gap);
    }

    .center {
        align-items: center;
    }

    .flex {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>