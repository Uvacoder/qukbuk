<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { database } from '$lib/supabase';
	import Loading from '$lib/components/Loading.svelte';

	let recipe;
	let loading = true;

	onMount(async () => {
		let data = await database.fetchPost($page.query.get('id'));
		recipe = data[0];
		loading = false;
	});
</script>

{#if loading}
	<section class="absolute top-0 w-screen h-screen grid place-items-center">
		<Loading />
	</section>
{:else}
	<article class="container max-w-screen-md px-5 pt-4 md:pt-8 pb-12 mx-auto flex flex-col">
		<img class="max-w-full" src={recipe.image} alt="the final result of the recipe" />
		<h1 class="text-2xl md:text-4xl font-bold mt-4 mb-2 md:mb-4">{recipe.title}</h1>
		<div class="w-full flex flex-wrap space-x-2 mb-8">
			{#each recipe.tags as tag}
				<p
					class="tracking-widest text-xs title-font bg-yellow-100 py-1 px-2 rounded font-medium text-yellow-700"
				>
					{tag}
				</p>
			{/each}
		</div>
		<p class="leading-relaxed md:text-lg">{recipe.description}</p>
		<h2 class="mt-8 text-xl md:text-2xl font-bold">Ingredients</h2>
		<hr class="border-black my-2" />
		<ul class="list-disc pl-8 leading-loose md:text-lg">
			{#each recipe.ingredients as ingredient}
				<li>{ingredient}</li>
			{/each}
		</ul>
		<h2 class="mt-8 text-xl md:text-2xl font-bold">Directions</h2>
		<hr class="border-black my-2" />
		<ol class="list-decimal pl-8 leading-loose md:text-lg">
			{#each recipe.directions as direction}
				<li>{direction}</li>
			{/each}
		</ol>
	</article>
{/if}
