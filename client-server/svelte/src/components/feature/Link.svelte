<script>
    import { Link } from 'svelte-routing'

    export let to = "/"
    let path
    $: selected = to === path

    const updatePath = ({ location }) => {
        path = location.pathname
    }
    
</script>

<div class="container">
    <Link {to} getProps={updatePath}>
        <div class="link gap" class:selected>
            <slot>
                Home
            </slot>
        </div>
    </Link>
</div>

<style>
    .container {
        display: inline-block;
    }

    .container > :global(a) {
        text-decoration: none;
    }

    .container > :global(a:focus) {
        outline: 2px solid var(--text-g);
    }

    .link {
        height: 4rem;
        text-decoration: none;
        color: var(--text-b);
        padding: 1rem;
        border-radius: .3rem;
        transition: all linear .2s;
        display: flex;
        align-items: center;
        --gap: 1rem;
    }

    .link:hover,
    .link.selected {
        color: var(--text-p);
        /* text-decoration: underline;      */
        background-color: var(--back-lg);        
    }
</style>