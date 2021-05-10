<script>
	import { Router, Route } from 'svelte-routing'
	import Frontpage from './containers/Frontpage.svelte'
	import Profile from './containers/Profile.svelte'
	const host = location.hostname
	const port = PORT || location.port

	let basepath = '/'
</script>

<main>
	<h1>Api is located at:</h1>
	<h2>{host}:{port}</h2>
	<Router {basepath}>
		<Route path="/profile" component="{Profile}"></Route>
		<Route path="/" component="{Frontpage}"></Route>
	</Router>
</main>