<script>
	import { page } from '$app/stores';
</script>

<header class="text-gray-600 body-font">
	<div class="container mx-auto flex p-5 items-center">
		<a href="/" class="flex title-font font-medium items-center text-gray-900 md:mb-0">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				class="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
				viewBox="0 0 24 24"
			>
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
			</svg>
			<span class="ml-3 text-xl">qukbuk</span>
		</a>
		{#if $page.path === '/'}
			<a
				href="/sign-in"
				class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0 ml-auto"
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
				class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0 ml-auto"
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
			<a
				href="/"
				class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0 ml-auto"
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
			</a>
		{/if}
	</div>
</header>
