<script>
	import Form from '../components/feature/form/Form.svelte'
	import Input from '../components/feature/form/Input.svelte'
	import Button from '../components/feature/Button.svelte'
	import Logo from '../components/content/Logo.svelte'
	import Container from '../components/layout/Container.svelte'
	import FormLink from '../components/feature/form/FormLink.svelte'
	import FromText from '../components/feature/form/FromText.svelte'
	import GoogleSignin from '../components/feature/GoogleSigninButton.svelte'
	import FormGroup from '../components/feature/form/FormGroup.svelte'
	import Heading from '../components/type/Heading.svelte'
	import { signup, signin, validEmail, validUsername, validPassword } from '../../../api/endpoints'
	import { navigate } from 'svelte-routing'
	import { user } from '../stores/user'
	import Load from '../components/feature/Load.svelte'

	let errorMessage = '', loading = false
	let email, password, username, confirmed
	let revalidatePassword
	$: valid = email && password && confirmed && username

	const emailValidator = async email => {
		const res = await validEmail({ email })
		if (!res.body.error) return true
		else return { valid: false, message: res.body.error.message }
	}

	const usernameValidator = async username => {
		const res = await validUsername({ username })
		if (!res.body.error) return true
		else return { valid: false, message: res.body.error.message }
	}

	const passwordValidator = async password => {
		const res = await validPassword({ password })
		if (!res.body.error) {
			if (revalidatePassword) revalidatePassword()
			return true
		}
		else return { valid: false, message: res.body.error.message }
	}

	const passwordConfirm = async confirmedPassword => {
		if (password === confirmedPassword) {
			confirmed = true
			return true
		}
		confirmed = false
		return { valid: false, message: 'Passwords does not match' }
	}

	const handleSignup = async () => {
		loading = true
		let res = await signup({ email, password, username })
		if (res.body.message) {
			errorMessage = ''
			res = await signin({ email, password })
			if (res.body.message) {
				loading = false
				user.signin()
				navigate('/')
			}
			else errorMessage = 'User created, but could not sign in'
		}
		else if (res.body.error) errorMessage = res.body.error.message
		else errorMessage = 'Something went wrong'
		loading = false
	}
</script>

<Container section contain center>
	<div>
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
					id="signin-confirm-password"
					validator={passwordConfirm}
					bind:revalidate={revalidatePassword}
					type="password">Confirm password</Input
				>
			</FormGroup>
			<FormGroup flex>
				<Button action={handleSignup} disabled={!valid}>Sign up</Button>
				<FromText>
					<span>Have an account?</span>
					<FormLink to="/signin">Sign in</FormLink>
				</FromText>
			</FormGroup>
			<FormGroup>
				<FromText error>{errorMessage}</FromText>
			</FormGroup>
			{#if loading}
				<FormGroup>
					<Load />
				</FormGroup>
			{/if}
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
