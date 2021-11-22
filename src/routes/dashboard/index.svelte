<script>
	import { currentUser, userRecipes } from '$lib/store';
	import { database } from '$lib/supabase';
	import { onMount } from 'svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';

	let loading = true;

	onMount(async () => {
		$userRecipes = await database.fetch();
		loading = false;
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<section class="text-gray-600 body-font">
		<div class="container px-5 pt-12 pb-24 mx-auto">
			<div class="flex flex-wrap -m-4">
				{#each $userRecipes as { id, url, image, title, description, tags } (id)}
					<RecipeCard {title} {description} {tags} {image} {url} {id} />
				{/each}
			</div>
		</div>
	</section>
{/if}
