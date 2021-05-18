<script>
    import { googleSignup } from '../../../../api/endpoints'
    import { navigate } from 'svelte-routing'
    import { user, googleUser as activeGoogleUser } from '../../stores/user'

    let email

    const googleSignin = async (id_token) => {
        const res = await googleSignup({ id_token })
        if (res.body.message) {
            user.signin()
            navigate('/')
        }
        else {
            navigate(`/google/link?id_token=${id_token}&email=${email}`)
        }
    }

    window.onSignIn = (googleUser) => {
        $activeGoogleUser = googleUser
        email = googleUser.getBasicProfile().getEmail()
        const id_token = googleUser.getAuthResponse().id_token
        googleSignin(id_token)
    }
</script>

<svelte:head>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<div class="g-signin2" data-onsuccess="onSignIn" data-width="200" data-longtitle="true"></div>