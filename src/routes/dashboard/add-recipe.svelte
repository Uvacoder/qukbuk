<script>
	import ImportRecipe from '$lib/components/ImportRecipe.svelte';
	import CreateRecipe from '$lib/components/CreateRecipe.svelte';

	let importRecipe = true;
</script>

<section class="text-gray-600 body-font">
	<div class="container mx-auto flex flex-col items-center">
		<div class="flex w-full md:w-2/3 lg:w-1/2 mt-4 md:mt-8">
			<button
				class:selected={importRecipe}
				class="w-1/2 bg-yellow-100 py-3 rounded-tl-lg md:text-lg border-b-4 border-yellow-200"
				on:click={() => (importRecipe = !importRecipe)}>Import Recipe</button
			>
			<button
				class:selected={!importRecipe}
				class="w-1/2 bg-yellow-100 py-3 rounded-tr-lg md:text-lg border-b-4 border-yellow-200"
				on:click={() => (importRecipe = !importRecipe)}>Create Recipe</button
			>
		</div>

		{#if importRecipe}
			<ImportRecipe />
		{:else}
			<CreateRecipe />
		{/if}
	</div>
</section>

<style>
	.selected {
		@apply bg-yellow-300 font-bold border-yellow-400;
	}
</style>
