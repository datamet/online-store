<script>
	import Icon from '../Icon.svelte'
	export let search = () => true

    let searching

    function out(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

    const doSearch = async (value) => {
        searching = true
        const searched = await search(value)
        await out(700)
        searching = false
    }

	let timeout
	const handleInput = e => {
		let ms = timeout ? 500 : 700
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			doSearch(e.target.value)
		}, ms)
	}

</script>

<div class="search">
    <div class="pulser {searching ? 'searching' : ''}"><span class="pulse"></span></div>
	<div class="icon"><Icon sprite="{searching ? '' : 'search'}" /></div>
	<input type="search" on:input={handleInput} />
</div>

<style>
	input {
		line-height: 3.3rem;
		border-radius: 0.3rem;
        width: 100%;
        border: none;
        padding: 0 3rem;
		border: 1px solid var(--back-g);
	}
    
    input:focus {
		line-height: 3.1rem;
        border: 2px solid var(--control-y);
    }

    .search {
        position: relative;
        height: 3.3rem;
        width: 100%;
        max-width: 60rem;
    }

    .pulser {
        display: none;
    }

    .pulser.searching {
        position: absolute;
        top: 50%;
        transform: translateY(-60%);
        left: 1.1rem;
        display: block;
    }

    .pulse {
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: var(--control-y);
        cursor: pointer;
        position:relative;
        border: 3px solid var(--control-y);
    }

    .pulse:after {
        content:"";
        display:block;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        border: 3px solid var(--control-y);
        position:absolute;
        top: -.525rem;
        left: -.525rem;
        animation: pulse 2s ease 0s infinite;
    }

    @keyframes pulse {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        80% {
            opacity: 0;
            transform: scale(2);
        }
        100% {
            opacity: 0;
            transform: scale(3);
        }
    }

    .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-44%);
        left: .5rem;
    }
</style>
