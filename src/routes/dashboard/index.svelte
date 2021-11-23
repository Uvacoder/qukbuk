<script>
	import Loading from '$lib/components/Loading.svelte';
	import FilterByTag from '$lib/components/FilterByTag.svelte';
	import { currentUser, userRecipes, optionsHidden } from '$lib/store';
	import { database, auth } from '$lib/supabase';
	import { onMount } from 'svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	let loading = true;

	onMount(async () => {
		auth.session();
		$userRecipes = await database.fetch();
		loading = false;
	});
</script>

{#if loading}
	<section class="absolute top-0 w-screen h-screen grid place-items-center">
		<Loading />
	</section>
{:else}
	<section
		class="text-gray-600 body-font"
		on:click={() => {
			if ($optionsHidden === false) {
				$optionsHidden = !$optionsHidden;
			}
		}}
	>
		<div class="container px-5 pt-8 pb-24 mx-auto">
			<FilterByTag />
			<div class="flex flex-wrap -m-4">
				{#each $userRecipes as { id, url, image, title, description, tags } (id)}
					<RecipeCard {title} {description} {tags} {image} {url} {id} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.loading {
		width: 100vw;
		height: 100vh;
		display: grid;
		place-items: center;
	}
</style>
