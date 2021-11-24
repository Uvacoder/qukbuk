<script>
	import { userRecipes, filteredBy, allTags } from '$lib/store';
	import { database } from '$lib/supabase';
	import { onMount } from 'svelte';

	let errorMessage;

	const filterTags = async (tag) => {
		try {
			$userRecipes = await database.fetchTags(tag, 0);
		} catch (error) {
			errorMessage = error;
		}
	};

	const fetchAll = async () => {
		$filteredBy = 'all';
		$userRecipes = await database.fetch(0);
	};
</script>

<ul class="flex items-center justify-center space-x-4 space-y-2 flex-wrap mb-6">
	<li
		class:selected={$filteredBy === 'all'}
		on:click={fetchAll}
		class="mt-2 cursor-pointer tracking-widest text-xs title-font bg-yellow-100 hover:bg-yellow-200 py-1 px-2 rounded font-medium text-yellow-700"
	>
		all
	</li>
	{#each $allTags as tag}
		<li
			class:selected={$filteredBy === tag}
			on:click={filterTags(tag)}
			class="cursor-pointer tracking-widest text-xs title-font bg-yellow-100 hover:bg-yellow-200 py-1 px-2 rounded font-medium text-yellow-700"
		>
			{tag}
		</li>
	{/each}
</ul>

<style>
	.selected {
		@apply bg-yellow-200;
	}
</style>
