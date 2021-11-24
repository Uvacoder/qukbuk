<script>
	import { currentUser, currentSession, optionsHidden } from '$lib/store';
	import { auth } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let w;

	const handleSignOut = () => {
		goto('/');
		auth.signOut().then((error) => {
			if (error) alert(error.message);
		});
	};
</script>

{#if $currentSession}
	<header bind:clientWidth={w} class="text-gray-600 body-font z-10 border-b-2">
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
			<!-- Options dropdown  -->
			<div class="ml-auto relative inline-block text-left">
				<div class="flex items-center">
					<a
						href="/dashboard/add-recipe"
						class="inline-flex justify-center rounded-l-md bg-yellow-200 px-2 md:px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-yellow-400"
					>
						<svg
							class="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/></svg
						>
					</a>
					<div on:click={() => ($optionsHidden = !$optionsHidden)}>
						<button
							type="button"
							class="inline-flex items-center w-full rounded-r-md bg-gray-100 px-2 md:px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200"
							id="menu-button"
							aria-expanded="true"
							aria-haspopup="true"
						>
							{#if $currentUser && w >= 768}
								{$currentUser.user_metadata.name}
							{/if}
							<!-- Heroicon name: solid/chevron-down -->
							<svg
								class="md:-mr-1 md:ml-2 h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>

				<!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
				<div
					hidden={$optionsHidden}
					class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabindex="-1"
					on:click={() => ($optionsHidden = !$optionsHidden)}
				>
					<div class="py-1" role="none">
						<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
						{#if w >= 768}
							<a
								href="/dashboard/add-recipe"
								class="hover:bg-gray-50 text-gray-700 block px-4 py-2 text-sm"
								role="menuitem"
								tabindex="-1"
								id="menu-item-0">New recipe</a
							>
						{:else if $currentUser && w <= 768}
							<a
								class="hover:bg-gray-50 text-gray-700 block px-4 py-2 text-sm"
								role="menuitem"
								tabindex="-1"
								id="menu-item-0">{$currentUser.user_metadata.name}</a
							>
						{/if}
						<hr />
						<a
							href="/dashboard/settings"
							class="hover:bg-gray-50 text-gray-700 block px-4 py-2 text-sm"
							role="menuitem"
							tabindex="-1"
							id="menu-item-1">Settings</a
						>
						<button
							on:click={handleSignOut}
							class="hover:bg-gray-50 text-gray-700 block w-full text-left px-4 py-2 text-sm"
							role="menuitem"
							tabindex="-1"
							id="menu-item-3"
						>
							Sign out
						</button>
					</div>
				</div>
			</div>

			<!-- <div class="ml-auto flex items-center space-x-3">
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
			</div> -->
		</div>
	</header>
{:else}
	<header class="text-gray-600 body-font">
		<div class="container mx-auto flex p-5 items-center">
			<a href="/" class="flex title-font font-medium items-center text-gray-900 md:mb-0">
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
			<div class="ml-auto flex items-center">
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
				{/if}
			</div>
		</div>
	</header>
{/if}
