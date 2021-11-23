<script>
	import { userRecipes } from '$lib/store';
	import { database } from '$lib/supabase';
	import { onMount } from 'svelte';

	let errorMessage;
	let allTags = [];

	onMount(() => {
		$userRecipes.map((recipe) => {
			for (let j = 0; j < recipe.tags.length; j++) {
				if (!allTags.includes(recipe.tags[j])) {
					allTags = [...allTags, recipe.tags[j]];
				}
			}
		});
	});

	const filterTags = async (tag) => {
		try {
			$userRecipes = await database.fetchTags(tag);
		} catch (error) {
			errorMessage = error;
		}
	};

	const fetchAll = async () => {
		$userRecipes = await database.fetch();
	};
</script>

<ul class="flex items-center justify-center space-x-4 space-y-2 flex-wrap mb-6">
	<li
		on:click={fetchAll}
		class="mt-2 cursor-pointer tracking-widest text-xs title-font bg-yellow-100 hover:bg-yellow-200 py-1 px-2 rounded font-medium text-yellow-700"
	>
		all
	</li>
	{#each allTags as tag}
		<li
			on:click={filterTags(tag)}
			class="cursor-pointer tracking-widest text-xs title-font bg-yellow-100 hover:bg-yellow-200 py-1 px-2 rounded font-medium text-yellow-700"
		>
			{tag}
		</li>
	{/each}
</ul>
