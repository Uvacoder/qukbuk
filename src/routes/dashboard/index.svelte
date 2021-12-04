<script>
	import Loading from '$lib/components/Loading.svelte';
	import FilterByTag from '$lib/components/FilterByTag.svelte';
	import { userRecipes, optionsHidden, filteredBy, totalRecipeCount } from '$lib/store';
	import { database, auth } from '$lib/supabase';
	import { onMount } from 'svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import Welcome from '$lib/components/Welcome.svelte';

	let loading = true;
	let loadingMore = false;

	onMount(async () => {
		auth.session();
		$userRecipes = await database.fetch(0);
		$filteredBy = 'all';
		loading = false;
	});

	const fetchMore = async () => {
		loadingMore = true;
		if ($filteredBy === 'all') {
			const newRecipes = await database.fetch($userRecipes.length);
			$userRecipes = [...$userRecipes, ...newRecipes];
		} else {
			const newRecipes = await database.fetchTags($filteredBy, $userRecipes.length);
			$userRecipes = [...$userRecipes, ...newRecipes];
		}
		loadingMore = false;
	};
</script>

<main class="flex flex-col items-center">
	{#if loading}
		<section class="absolute top-0 w-screen h-screen grid place-items-center">
			<Loading />
		</section>
	{:else if $userRecipes.length === 0}
		<Welcome />
	{:else}
		<section
			class="text-gray-600 body-font md:w-full"
			on:click={() => {
				if ($optionsHidden === false) {
					$optionsHidden = !$optionsHidden;
				}
			}}
		>
			<div class="container px-5 pt-8 pb-12 mx-auto">
				<FilterByTag />
				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-full">
					{#each $userRecipes as { id, url, image, title, description, tags, own } (id)}
						<RecipeCard {title} {description} {tags} {image} {url} {id} {own} />
					{/each}
				</div>
			</div>
		</section>
		<button
			on:click={fetchMore}
			hidden={$userRecipes.length == $totalRecipeCount}
			class="bg-gray-100 hover:bg-gray-200 shadow-sm font-bold text-gray-500 hover:text-gray-600 px-6 py-4 mb-12 rounded-lg"
		>
			{#if $userRecipes.length !== $totalRecipeCount}
				{#if loadingMore}
					Loading...
				{:else}
					Show more
				{/if}
			{/if}
		</button>
	{/if}
</main>
