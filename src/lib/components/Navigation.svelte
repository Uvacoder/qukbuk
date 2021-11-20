<script>
	import { currentUser, currentSession } from '$lib/store';
	import { auth } from '$lib/supabase';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		auth.session();
		$currentSession ? goto('/dashboard') : goto('/');
	});

	const handleSignOut = () => {
		auth.signOut().then((error) => {
			if (error) alert(error.message);
			goto('/');
		});
	};
</script>

<header class="text-gray-600 body-font">
	<div class="container mx-auto flex p-5 items-center">
		<a
			href={$currentSession ? '/dashboard' : '/'}
			class="flex title-font font-medium items-center text-gray-900 md:mb-0"
		>
			<svg
				width="59"
				height="48"
				viewBox="0 0 59 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_2_2)">
					<rect width="58.7943" height="48" fill="white" />
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0.0326485 0C0.0371112 0 0.0415265 0.000914895 0.0456217 0.00268818L26.0997 11.2844V48L3.46186 38.1975C1.36028 37.2875 0 35.2162 0 32.926V0.0326492C0 0.0146179 0.0146172 0 0.0326485 0ZM32.7239 48L55.3617 38.1975C57.4633 37.2875 58.8236 35.2162 58.8236 32.926V0.0326507C58.8236 0.0146182 58.809 0 58.791 0C58.7865 0 58.7821 0.000915535 58.778 0.00268894L32.7239 11.2844V48Z"
						fill="#10B981"
					/>
				</g>
				<defs>
					<clipPath id="clip0_2_2">
						<rect width="58.7943" height="48" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<span class="ml-6 text-2xl font-black text-gray-700">qukbuk</span>
		</a>
		<div class="ml-auto flex items-center">
			{#if $currentUser}
				<p class="mr-5 hover:text-gray-900">{$currentUser.user_metadata.name}</p>
			{/if}
			{#if $page.path === '/'}
				<a
					href="/sign-in"
					class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
					>Sign in
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="w-4 h-4 ml-1"
						viewBox="0 0 24 24"
					>
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</a>
			{:else if $page.path === '/sign-in'}
				<a
					href="/"
					class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
					>Sign up
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="w-4 h-4 ml-1"
						viewBox="0 0 24 24"
					>
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</a>
			{:else}
				<button
					on:click={handleSignOut}
					class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
					>Sign out
					<svg
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						class="w-4 h-4 ml-1"
						viewBox="0 0 24 24"
					>
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</button>
			{/if}
		</div>
	</div>
</header>
