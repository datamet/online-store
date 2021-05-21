<script>
    import Icon from '../Icon.svelte'
    export let payment, complete = false

    $: complete = payment && false
</script>

<div class="error">
    <Icon sprite="notice"/><span>Invalid payment</span>
</div>

<style>
    .error {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--control-r);
    }
</style>