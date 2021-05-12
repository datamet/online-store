<script>
	import { Router, Route, Link } from 'svelte-routing'
	import Frontpage from './containers/Frontpage.svelte'
	import Header from './containers/Header.svelte'
	import Profile from './containers/Profile.svelte'
	import Signin from './containers/Signin.svelte'
	import Signup from './containers/Signup.svelte'

	const host = location.hostname
	const port = PORT || location.port

	let basepath = '/'
</script>

<main>
	<Router {basepath}>
		<Header />
		<Route path="/profile" component={Profile} />
		<Route path="/signin" component={Signin} />
		<Route path="/signup" component={Signup} />
		<Route path="/" component={Frontpage} />
	</Router>
</main>
