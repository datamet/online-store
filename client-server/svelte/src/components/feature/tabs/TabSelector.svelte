<script>
    import { onMount } from 'svelte'
    export let tabs = ['tab 1'], selected

    onMount(() => {
        selected = selected
    })

</script>

<div class="container">
    <ul>
        {#each tabs as tab (tab)}
            <li on:click={() => selected = tab} class="{selected ? selected.toLowerCase() === tab.toLowerCase() ? 'selected' : '' : ''}">
                <span>{tab}</span>
            </li>
        {/each}
    </ul>
</div>

<style>
    .container {
        background-color: var(--back-lg);
        border-radius: .6rem;
        padding: var(--gap);
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-auto-flow: column;
        gap: var(--gap);
    }

    li {
        display: block;
        cursor: pointer;
        border-radius: .4rem;
        background-color: var(--back-g);
        color: var(--text-g);
        padding: var(--gap);
        position: relative;
        overflow: hidden;
        text-align: center;
        transition: all .2s linear;
    }

    .selected {
        background-color: var(--back-dp);
        color: var(--text-l);
    }
</style>