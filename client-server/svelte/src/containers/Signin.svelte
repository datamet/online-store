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

	let email, password
	$: valid = email && password

	const emailValidator = async email => {
		const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		return email.match(regex)
	}

	const passwordValidator = async email => {
		return true
	}

	const signin = () => {}
</script>

<div>
	<Container contain center>
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
					bind:value={email}
					id="signin-email"
					validator={emailValidator}
					type="email">Email</Input
				>
				<Input
					bind:value={password}
					id="signin-password"
					validator={passwordValidator}
					type="password">Password</Input
				>
			</FormGroup>
			<FormGroup flex>
				<Button action={signin} disabled={!valid}>Sign in</Button>
				<FromText>
					<span>No account?</span>
					<FormLink to="/signup">Sign up</FormLink>
				</FromText>
			</FormGroup>
		</Form>
	</Container>	
</div>

<style>
	div {
		--f-type: 'Abril Fatface'
	}
</style>