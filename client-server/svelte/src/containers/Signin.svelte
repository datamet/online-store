<script>
	import Form from '../components/feature/form/Form.svelte'
	import Input from '../components/feature/form/Input.svelte'
	import Button from '../components/feature/Button.svelte'
	import Container from '../components/layout/Container.svelte'
	import Logo from '../components/content/Logo.svelte'
	import FormLink from '../components/feature/form/FormLink.svelte'
	import FromText from '../components/feature/form/FromText.svelte'
	import GoogleSignin from '../components/feature/GoogleSignin.svelte'
	import FormGroup from '../components/feature/form/FormGroup.svelte'
	import Heading from '../components/type/Heading.svelte'
	import { signin } from '../../../api/endpoints'
	import { navigate } from 'svelte-routing'
	import { user } from '../stores/user'

	let errorMessage = ''
	let email, password

	const handleSignin = async () => {
		const res = await signin({ email, password })
		if (res.body.message) {
			user.signin()
			navigate('/')
		}
		else if (res.body.error) errorMessage = res.body.error.message
		else errorMessage = 'Something went wrong'
	}
</script>

<Container section contain center>
	<div>
		<Form>
			<FormGroup center>
				<Logo size="medium"/>
				<Heading>Welcome back</Heading>
			</FormGroup>
			<FormGroup center>
				<GoogleSignin />
			</FormGroup>
			<FormGroup>
				<Input
					required
					bind:value={email}
					id="signin-email"
					type="email">Email</Input
				>
				<Input
					required
					bind:value={password}
					id="signin-password"
					type="password">Password</Input
				>
			</FormGroup>
			<FormGroup flex>
				<Button action={handleSignin}>Sign in</Button>
				<FromText>
					<span>No account?</span>
					<FormLink to="/signup">Sign up</FormLink>
				</FromText>
			</FormGroup>
			<FormGroup>
				<FromText error>{errorMessage}</FromText>
			</FormGroup>
		</Form>
	</div>
</Container>	

<style>
	div {
		--f-type: 'Abril Fatface';
		max-width: 100%;
		width: 25rem;
	}
</style>