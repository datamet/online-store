<script>
	import Button from '../components/feature/Button.svelte'
	import Link from '../components/feature/Link.svelte'
	import { user, googleUser } from '../stores/user'
	import { signout } from '../../../api/endpoints'
	import { navigate } from 'svelte-routing'

	const handleSignout = async () => {
		// if($googleUser) $googleUser.disconnect()
		await signout()
		user.signout()
		navigate('/')
	}
</script>

<div>
	{#if !$user}
		<Link to="/signin">Sign in</Link>
	{:else}
		<Button action={handleSignout}>Sign out</Button>
	{/if}
</div>

<style>
</style>
