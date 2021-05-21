<script>
    import { fade } from 'svelte/transition'
    import { message } from '../../stores/toast'

    let msg = ''

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    message.subscribe(m => {
        const setMessage = async () => {
            msg = m
            await timeout(4000)
            msg = ''
        }
        setMessage()
    })

</script>

{#if msg}
<div class="toast" transition:fade={{ duration: '200'}}>
    <p>{msg}</p>
</div>
{/if}

<style>
    .toast {
        position: fixed;
        z-index: 1000;
        top: 4rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--back-lg);
        border-radius: .6rem;
        padding: var(--gap);
    }

    p {
        margin: 0;
    }
</style>