<script>
	import Container from '../components/layout/Container.svelte'
	import Link from '../components/feature/Link.svelte'
	import Nav from '../components/feature/Nav.svelte'
	import Logo from '../components/content/Logo.svelte'
	import User from './User.svelte'
	import CartLink from '../components/content/CartLink.svelte'
	import { user } from '../stores/user'
</script>

<Container content contain>
	<Nav>
		<div slot="left">
			<Logo text />
		</div>
		<div class="flex gap" slot="right">
			<Link to="/catalogue">Catalogue</Link>
			{#if !$user}
				<Link to="/orders">Find Orders</Link>
			{/if}
			<User />
			<CartLink />
		</div>
	</Nav>
</Container>

<style>
	.flex {
		display: flex;
		align-self: center;
	}
</style>
