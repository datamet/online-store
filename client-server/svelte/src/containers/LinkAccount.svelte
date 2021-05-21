<script>
	import Form from '../components/feature/form/Form.svelte'
	import Input from '../components/feature/form/Input.svelte'
	import Button from '../components/feature/Button.svelte'
	import Container from '../components/layout/Container.svelte'
	import Logo from '../components/content/Logo.svelte'
	import FromText from '../components/feature/form/FromText.svelte'
	import GoogleSignin from '../components/feature/GoogleSigninButton.svelte'
	import FormGroup from '../components/feature/form/FormGroup.svelte'
	import Heading from '../components/type/Heading.svelte'
	import { googleSignup } from '../../../api/endpoints'
	import { navigate } from 'svelte-routing'
	import { user } from '../stores/user'

	let errorMessage = ''
	let id_token, email, password

	const params = new URLSearchParams(window.location.search)
	id_token = params.get('id_token')
	email = params.get('email')

	const handleLink = async () => {
        const res = await googleSignup({ id_token, email, password })
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
				<Heading>Link accounts</Heading>
                <FromText>This email is already in use by a non-google account. Please sign in to verify it's yours. You only have to do this one time.</FromText>
			</FormGroup>
			<FormGroup>
				<Input
					readonly
					initial={email}
					id="link-email"
					type="email">Email</Input
				>
				<Input
					required
					bind:value={password}
					id="link-password"
					type="password">Password</Input
				>
			</FormGroup>
			<FormGroup>
				<Button action={handleLink}>Link accounts</Button>
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