<script>
    export let center = false, right = false, flex = false, grid = false
</script>

<div class="group" class:center class:flex class:grid class:right>
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
    
    .right {
        align-items: flex-end;
    }

    .flex {
        flex-direction: row;
        gap: calc(var(--gap) * 2);
        align-items: center;
        justify-content: space-between;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--gap);
    }
</style>