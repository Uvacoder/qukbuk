<script>
	import { database } from '$lib/supabase';
	import { onMount } from 'svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap -m-4">
			{#await database.fetch()}
				Loading...
			{:then recipes}
				{#each recipes as { id, url, image, title, description, tags }}
					<RecipeCard {title} {description} {tags} {image} {url} {id} />
				{/each}
			{/await}
		</div>
	</div>
</section>
