<script>
	import Container from '../layout/Container.svelte'
	import { user } from '../../stores/user'
</script>

<Container contain>
	<footer>
		<div>
			<p class="copy">&copy; Sahara Store, 2021</p>
		</div>
	</footer>
</Container>

<style>
	footer {
		margin-top: 6rem;
		padding-bottom: 4rem;
		border-top: 1px solid var(--back-lg);
	}

	p {
		color: var(--text-g);
	}

	.copy {
		text-align: center;
	}
</style>
