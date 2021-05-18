<script>
	import { user } from '../stores/user'
	import Link from '../components/feature/Link.svelte'
	import UserProfile from '../components/feature/UserProfile.svelte'
</script>

<div class="flex gap">
	{#if !$user}
		<Link to="/signin">Sign in</Link>
	{/if}
	<UserProfile />
</div>

<style>
	.flex {
		display: flex;
		align-items: center;
	}
</style>
