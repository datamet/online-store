<script>
	import Container from '../components/layout/Container.svelte'
	import Heading from '../components/type/Heading.svelte'
	import Stack from '../components/layout/Stack.svelte'

	import Catalogue from './Catalogue.svelte'
</script>

<Container container section center narrow>
	<div class="image-container">
		<img src="/assets/city.svg" alt="City scape">
		<div class="text">
			<Stack size="medium">
				<span class="heading"
					><Heading type="h1" center>SAHARA</Heading></span
				>
				<p class="sub center">Everyday products, for everyday people</p>
			</Stack>
		</div>
	</div>
</Container>

<Catalogue />

<style>
	.image-container {
		position: relative;
		max-width: 90rem;
	}

	.heading {
		--f-size: 5rem;
	}

	.text {
		position: absolute;
		top: 10%;
		display: flex;
		align-items: center;
		text-align: center;
		left: 50%;
		transform: translateX(-50%);
		--f-size: 4rem;
	}

	.heading :global(h1) {
		letter-spacing: .05em;
		font-weight: 400;
	}

	.center {
		text-align: center;
	}

	.sub {
		font-size: 2.3rem;
	}
</style>
