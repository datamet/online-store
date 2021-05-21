<script>
    export let action = () => {}, disabled = false, fill = false, color = 'yellow'
</script>

<div>
    <button class="{color}" {disabled} class:fill on:click={action}><span><slot /></span></button>
</div>

<style>
    button {
        text-decoration: none;
        color: var(--text-b);
        background-color: var(--back-y);
        padding: 1rem 1.5rem;
        border-radius: .3rem;
        border: none;
        transition: all linear .2s;
        display: flex;
        align-items: center;
        --gap: 1rem;
        display: flex;
        align-items: center;
    }

    .fill {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    button:hover {
        color: var(--text-g);
        background-color: var(--control-y);
    }

    .red {
        background-color: var(--control-r);
        color: var(--text-l);
    }

    .red:hover {
        color: var(--text-l);
        background-color: var(--control-dr);
    }

    button:disabled:hover {
        
    }

    button:disabled {
        color: var(--text-l);
        background-color: var(--back-g);
    }
</style>