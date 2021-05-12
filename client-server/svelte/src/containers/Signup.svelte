<script>
	import Form from '../components/feature/form/Form.svelte'
	import Input from '../components/feature/form/Input.svelte'
	import Button from '../components/feature/Button.svelte'
	import Logo from '../components/content/Logo.svelte'
	import Container from '../components/layout/Container.svelte'
	import FormLink from '../components/feature/form/FormLink.svelte'
	import FromText from '../components/feature/form/FromText.svelte'
	import GoogleSignin from '../components/feature/GoogleSignin.svelte'
	import FormGroup from '../components/feature/form/FormGroup.svelte'
	import Heading from '../components/type/Heading.svelte'

	let email, password, username
	$: valid = email && password && username

	const emailValidator = async email => {
		const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		return email.match(regex)
	}

	const usernameValidator = async email => {
		const regex = /.*/
		return email.match(regex)
	}

	const passwordValidator = async email => {
		return true
	}

	const signup = () => {}
</script>

<div>
	<Container contain center>
		<Form>
			<FormGroup center>
				<Logo size="medium"/>
				<Heading>Welcome</Heading>
			</FormGroup>
			<FormGroup center>
				<GoogleSignin />
			</FormGroup>
			<FormGroup>
				<Input
					bind:value={username}
					id="signin-name"
					validator={usernameValidator}
					type="text">Name</Input
				>
				<Input
					bind:value={email}
					id="signin-email"
					validator={emailValidator}
					type="email">Email</Input
				>
			</FormGroup>
			<FormGroup>
				<Input
					bind:value={password}
					id="signin-password"
					validator={passwordValidator}
					type="password">Password</Input
				>
				<Input
					bind:value={password}
					id="signin-confirm-password"
					validator={passwordValidator}
					type="password">Confirm password</Input
				>
			</FormGroup>
			<FormGroup flex>
				<Button action={signup} disabled={!valid}>Sign up</Button>
				<FromText>
					<span>Have an account?</span>
					<FormLink to="/signin">Sign in</FormLink>
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
