<script>
	import { currentUser, currentSession } from '$lib/store';
	import { auth } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		auth.session();
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
		<a href="/dashboard" class="flex title-font font-medium items-center text-gray-900 md:mb-0">
			<svg
				class="scale-75 md:scale-100"
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
			<span class="ml-6 text-2xl font-black text-gray-700 hidden md:inline">qukbuk</span>
		</a>
		<div class="ml-auto flex items-center space-x-3">
			<a href="/dashboard/add-recipe">Add recipe</a>
			{#if $currentUser}
				<p class="hover:text-gray-900">{$currentUser.user_metadata.name}</p>
			{/if}
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
		</div>
	</div>
</header>
