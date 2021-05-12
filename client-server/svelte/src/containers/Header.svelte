<script>
	import Container from '../components/layout/Container.svelte'
	import Link from '../components/feature/Link.svelte'
	import Nav from '../components/feature/Nav.svelte'
	import Logo from '../components/content/Logo.svelte'
	import User from './User.svelte'
    import Icon from '../components/feature/Icon.svelte'
</script>

<Container content contain>
	<Nav>
		<div slot="left">
			<Logo text />
		</div>
		<div class="flex gap" slot="right">
			<User />
			<Link to="/cart">
                <Icon sprite="cart" />
            </Link>
		</div>
	</Nav>
</Container>

<style>
	.flex {
		display: flex;
		align-self: center;
	}
</style>
