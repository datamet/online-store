<script>
    export let to = ''
    import { link } from 'svelte-routing'
</script>

<a href={to} use:link><slot /></a>

<style>
    a:link, a:visited {
        font-weight: 700;
        color: var(--text-b);
        transition: .1s all ease-out;
    }

    a:hover {
        color: var(--text-y);
    }
</style>