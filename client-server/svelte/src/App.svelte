<script>
	import { Router, Route, Link } from 'svelte-routing'
	import Frontpage from './containers/Frontpage.svelte'
	import Header from './containers/Header.svelte'
	import Profile from './containers/Profile.svelte'
	import Signin from './containers/Signin.svelte'
	import Signup from './containers/Signup.svelte'
	import { setup } from '../../api/endpoints'
	import LinkAccount from './containers/LinkAccount.svelte'
	import Product from './containers/Product.svelte'
	import Cart from './containers/Cart.svelte'
	import Catalogue from './containers/Catalogue.svelte';

	const host = location.hostname
	const port = PORT || location.port

	setup('http', host, port)

	let basepath = '/'
</script>

<main>
	<Router {basepath}>
		<Header />
		<Route path="/profile" component={Profile} />
		<Route path="/signin" component={Signin} />
		<Route path="/signup" component={Signup} />
		<Route path="/product/:product_id" let:params>
			<Product id={params.product_id} />
		</Route>
		<Route path="/google/link" component={LinkAccount} />
		<Route path="/cart" component={Cart} />
		<Route path="/catalogue" component={Catalogue} />
		<Route path="/" component={Frontpage} />
	</Router>
</main>
