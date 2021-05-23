<script>
    import { user } from "../../stores/user"
    import { outside } from '../../directives/outside';
    import { link, navigate } from 'svelte-routing'
	import { signout } from '../../../../api/endpoints'
    import { onDestroy } from 'svelte'
    import Icon from "./Icon.svelte"

    let open = false
    let admin = false
	let unsub = user.subscribe(() => {
        const checkAdmin = async () => {
            admin = await user.inGroup('admin')
        }
        checkAdmin()
	})

	onDestroy(() => {
		unsub()
	})

    const handleSignout = async () => {
		// if($googleUser) $googleUser.disconnect()
		await signout()
		user.signout()
		navigate('/')
        window.location.reload();
	}
</script>

{#if $user}
    <div use:outside on:outside={() => open = false} class="container">
        <button class:open class=" dropdown" on:click={() => open = !open}>
            <div class="flex gap">
                {#if $user.image}
                    <div class="image">
                        <img src="{$user.image || '/logo-450.png'}" alt="">
                    </div>
                {:else}
                    <Icon sprite="profile" />
                {/if}
                <div class="flex">
                    <span class="username">{$user.username}</span>
                    <span class="icon"><Icon sprite="arrow-down"/></span>
                </div>
            </div>
        </button>
        {#if open}
            <div class="menu">
                <div class="signed-in">Signed in as <span class="bold">{$user.username}</span></div>
                <span class="line"></span>
                <!-- <a class="menu-item" href="/settings" use:link>Profile settings</a> -->
                <a class="menu-item" href="/orders" use:link>Your orders</a>
                {#if admin}
                    <span class="line"></span>
                    <span class="menu-text">Admin options</span>
                    <a class="menu-item" href="/admin/dashboard" use:link>Dashboard</a>
                {/if}
                <span class="line"></span>
                <button class="menu-item" on:click={handleSignout}>Sign out</button>
            </div>
        {/if}
    </div>
{/if}

<style>
    .container {
        position: relative;
        color: var(--text-g);
        display: flex;
        align-items: center;
    }

    .line {
        border-bottom: 1px solid var(--back-lg);
    }
    
    .signed-in {
        font-size: 1.4rem;
        padding: .4rem .4rem .4rem .6rem;
    }

    .bold {
        font-weight: 700;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .username {
        font-size: 1.6rem;
        color: var(--text-g);
    }

    .image {
        overflow: hidden;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
    }

    .icon {
        fill: var(--text-g);
        display: flex;
        align-items: center;
    }

    .dropdown {
        background: transparent;
        border: none;
        padding: .9rem 1rem .9rem 1rem;
        border-radius: .3rem;
    }

    .dropdown:hover,
    .open {
        background-color: var(--back-lg);
    }

    .menu {
        position: absolute;
        top: 5rem;
        left: 50%;
        transform: translateX(-50%);
        padding: .7rem;
        border-radius: .6rem;
        border: 1px solid var(--back-lg);
        display: grid;
        grid-template-columns: max-content;
        gap: .4rem;
        background-color: white;
        z-index: 100;
    }

    .menu-item {
        border-radius: .3rem;
        padding: .6rem;
        font-size: 1.5rem;
        border: none;
        background: transparent;
        text-align: left;
        color: var(--text-g);
    }

    .menu-item:link, .menu-item:visited {
        color: var(--text-g);
        text-decoration: none;
    }

    .menu-item:hover {
        background-color: var(--back-lg);
    }

    .menu-text {
        font-size: 1.3rem;
        font-weight: 700;
        padding: .6rem .6rem .3rem .6rem;
    }
</style>