<script>
    export let action = () => {}, disabled = false, disabledText = ''
</script>

<div>
    <button {disabled} on:click={action}><slot /></button>
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
    }

    button:hover {
        color: var(--text-g);
        background-color: var(--control-y);
    }

    button:disabled:hover {
        
    }

    button:disabled {
        color: var(--text-l);
        background-color: var(--back-g);
    }
</style>