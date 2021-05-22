<script>
    import { admin } from '../directives/admin'
    import Container from "../components/layout/Container.svelte"
    import { getProducts, getDiscounts, createDiscount, removeDiscount, getOrderStatistics } from '../../../api/endpoints'
    import { onMount } from 'svelte';
    import ManagedProductList from '../components/feature/manage/ManagedProductList.svelte';
    import Heading from '../components/type/Heading.svelte';
    import ProductListTraverser from '../components/feature/product/ProductListTraverser.svelte';
    import { link, navigate } from 'svelte-routing'
    import Button from '../components/feature/Button.svelte'
    import Stack from '../components/layout/Stack.svelte';
    import DiscountManager from '../components/feature/discounts/DiscountManager.svelte';
    import KeywordList from '../components/feature/keywords/KeywordList.svelte';
    import OrderStatistics from '../components/feature/orders/OrderStatistics.svelte';
    import { productStore } from '../stores/fetch'

    let products, previous, next, errorMessage = ''
    let codes = [], discountError, createDiscountError
    let statistics, statsError = ''

    const fetchProducts = async (url) => {
        const { set, res } = url ? await productStore.fetch(url) : await productStore.fetch({ count: 6 })
        if (res.body.products) {
            products = res.body.products
            previous = res.body.prev
            next = res.body.next
        }
        else if (res.body.error) errorMessage = res.body.error.message
        else errorMessage = 'Could not load products'
    }

    const fetchDiscounts = async () => {
        const res = await getDiscounts()
        if (res.body.discounts) {
            for (const discount of res.body.discounts) {
                if (!codes) codes = []
                codes.push(`${discount.code} - ${discount.percent}%`)
            }
            codes = codes
        }
        else if (res.body.error) discountError = res.body.error.message
        else discountError = 'Something went wrong'
    }

    const fetchOrderStats = async () => {
        const res = await getOrderStatistics()
        if (res.body.statistics) statistics = res.body.statistics
        else if (res.body.error) statsError = res.body.error.message
        else statsError = 'Something went wrong'
    }

    const handleNewCode = async event => {
        let code = event.detail.code
        let percent = event.detail.percent
        const res = await createDiscount({ code, percent })
        if (res.body.message) {
            createDiscountError = ''
            if (!codes) codes = []
            codes = [...codes, `${code} - ${percent}%`]
        }
        else if (res.body.error) createDiscountError = res.body.error.message
        else createDiscountError = 'Something went wrong'
    }

    const handleRemoveCode = async event => {
        const [code, percent] = event.detail.keyword.split(' - ')
        const res = await removeDiscount({ discount_code: code })
    }

    onMount(() => {
        fetchProducts()
        fetchDiscounts()
        fetchOrderStats()
    })

</script>

<span use:admin />

<Container contain section>
    <div class="card">
        <div class="flex">
            <div>
                <Heading type="h1">Dashboard</Heading>
                <p>The dashboard allows you to manage products, orders and discount codes.</p>
            </div>
            <div class="image-container">
                <img src="/assets/dashboard.svg" alt="Dashboard">
            </div>
        </div>
    </div>
    <Container contain section>
        <Stack size="medium">
            <Heading>Products</Heading>
            <div class="grid">
                {#if products}
                    <Stack size="medium">
                        {#if products.length > 0}
                            <ManagedProductList {products} />
                        {:else}
                            <p class="empty">No products in store yet</p>
                        {/if}
                        <ProductListTraverser {previous} {next} fetch={fetchProducts} />
                    </Stack>
                {:else}
                    <div class="error">
                        <p class="error-message">{errorMessage}</p>
                    </div> 
                {/if}
                <div class="hollow-card">
                    <Heading type="h3">Create new product</Heading>
                    <p>New products will be available to all buyers instantly.</p>
                    <Button action={() => navigate('/manage/products/create')}>Create Product</Button>
                </div>
            </div>
        </Stack>
    </Container>
    <Container contain section>
        <Heading>Active discount codes</Heading>
        <div class="grid">
            <Stack size="medium">
                {#if codes && codes.length > 0}
                    <KeywordList keywords={codes} on:remove={handleRemoveCode} />
                {:else if codes}
                    <p class="empty">No discount codes yet</p>
                {/if}
                {#if discountError}
                    <div class="error">
                        <p class="error-message">{discountError}</p>
                    </div>
                {/if}
            </Stack>
            <div class="hollow-card">
                <Stack size="medium">
                    <Heading>Create new code</Heading>
                    <p class="no-m">New codes will be available to users instantly upon creation and stay valid until they are removed.</p>
                    <DiscountManager on:code={handleNewCode} />
                    {#if createDiscountError}
                        <div class="error">
                            <p class="error-message">{createDiscountError}</p>
                        </div>
                    {/if}
                </Stack>
            </div>
        </div>
    </Container>
    <Container contain section>
        <Stack size="medium">
            <Heading>Order statistics</Heading>
            {#if !statsError}
                <div class="card">
                    <Stack size="medium">
                        <OrderStatistics {statistics} />
                    </Stack>
                </div>
            {:else}
                <div class="error">
                    <p class="error-message">{statsError}</p>
                </div>
            {/if}
        </Stack>
    </Container>
</Container>

<style>
    .card {
        padding: calc(var(--space) * 1.5);
        background-color: var(--back-lg);
        border-radius: .6rem;
    }

    .empty {
        font-size: 1.8rem;
    }

    .flex {
        display: flex;
        gap: 4rem;
        align-items: center;
        justify-content: space-between;
    }

    .image-container :global(*) {
        max-width: 30rem;
    }

    .error {
        
    }

    .error-message {
        margin: 0;
        color: var(--control-r);
    }

    .grid {
        display: grid;
        gap: 4rem;
        grid-template-columns: 1fr;
        align-items: flex-start;
    }

    .hollow-card {
        padding: var(--space);
        border-radius: .6rem;
        border: 1px solid var(--back-lg);
        --f-size: 2.2rem;
    }

    @media (min-width: 62.25em) {
        .grid {
            grid-template-columns: 1fr 40rem;
        }
    }

    .no-m {
        margin: 0;
    }
</style>