<script>
    const googleSignin = async (id_token) => {
        const url = `/auth/google?id_token=${id_token}`

        const res = await fetch(url, { method: 'post' })
        const body = await res.json()
        console.log(body)
    }

    window.onSignIn = (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token
        googleSignin(id_token)
    }
</script>

<svelte:head>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<div class="g-signin2" data-onsuccess="onSignIn" data-width="200" data-longtitle="true"></div>