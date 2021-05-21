<script>
	import { Router, Route } from 'svelte-routing'
	import Frontpage from './containers/Frontpage.svelte'
	import Header from './containers/Header.svelte'
	import Profile from './containers/Profile.svelte'
	import Signin from './containers/Signin.svelte'
	import Signup from './containers/Signup.svelte'
	import { setup } from '../../api/endpoints'
	import LinkAccount from './containers/LinkAccount.svelte'
	import Product from './containers/Product.svelte'
	import Cart from './containers/Cart.svelte'
	import Catalogue from './containers/Catalogue.svelte'
	import Checkout from './containers/Checkout.svelte'
	import Order from './containers/Order.svelte'
	import ProductForm from './containers/ProductForm.svelte'
	import Footer from "./components/content/Footer.svelte"
	import Orders from './containers/Orders.svelte'
	import { tabbing } from "./directives/tabbing";
	import Toast from './components/feature/Toast.svelte'
	import Dashboard from './containers/Dashboard.svelte';
	
	const host = location.hostname
	const port = PORT || location.port

	setup('http', host, port)

	let basepath = '/'
</script>

<Toast />

<main use:tabbing>
	<Router {basepath}>
		<Header />
		<Route path="/profile" component={Profile} />
		<Route path="/signin" component={Signin} />
		<Route path="/signup" component={Signup} />
		<Route path="/product/:product_id" let:params>
			<Product id={params.product_id} />
		</Route>
		<Route path="/manage/products/create" component={ProductForm} />
		<Route path="/manage/product/:product_id/create" let:params>
			<ProductForm id={params.product_id}></ProductForm>
		</Route>
		<Route path="/admin/dashboard" component={Dashboard} />
		<Route path="/checkout/:checkout_id/*" let:params>
			<Checkout id={params.checkout_id} />
		</Route>
		<Route path="/orders" component={Orders} />
		<Route path="/order/:order_id" let:params>
			<Order id={params.order_id} />
		</Route>
		<Route path="/google/link" component={LinkAccount} />
		<Route path="/cart" component={Cart} />
		<Route path="/catalogue" component={Catalogue} />
		<Route path="/" component={Frontpage} />
	</Router>
</main>

<Footer />