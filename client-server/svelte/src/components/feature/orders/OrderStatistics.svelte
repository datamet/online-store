<script>
    import Stack from '../../layout/Stack.svelte'
    import Heading from '../../type/Heading.svelte'

	export let statistics
</script>

{#if statistics}
    <div class="grid statistics">
        <Stack>
            <Heading type="h3">Number of orders</Heading>
            <p>{statistics.number_of_orders}</p>
        </Stack>
        <Stack>
            <Heading type="h3">Total revenue</Heading>
            <p>NOK {statistics.total_revenue},-</p>
        </Stack>
        <Stack>
            <Heading type="h3">Revenue lost to cupons</Heading>
            <p>NOK {statistics.revenue_before_cupons - statistics.total_revenue},-</p>
        </Stack>
        <Stack>
            <Heading type="h3">Products sold</Heading>
            <p>{statistics.products_sold}</p>
        </Stack>
    </div>
{/if}

<style>
	.grid {
		display: grid;
		gap: 4rem;
		grid-template-columns: repeat(2, 1fr);
	}

	.statistics {
        text-align: center;
        font-size: 2rem;
		--f-size: 2.2rem;
	}
</style>
