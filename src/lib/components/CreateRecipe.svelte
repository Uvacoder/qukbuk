<script>
	import { database } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let title, description, tags, image, errorMessage;

	let loading = false;

	const createRecipe = async () => {
		loading = true;
		try {
			await database.post('', title, description, '', tags.split(', '), ingredients, directions);
			goto('/dashboard');
		} catch (error) {
			errorMessage = error;
		}
		loading = false;
	};

	let newIngredient = '';
	let ingredients = [];

	const addIngredient = () => {
		ingredients = [...ingredients, newIngredient];
		newIngredient = '';
	};

	let newDirection = '';
	let directions = [];

	const addDirection = () => {
		directions = [...directions, newDirection];
		newDirection = '';
	};
</script>

{#if loading}
	<div class="absolute top-0 w-screen h-screen bg-white z-10 grid place-items-center">
		<p>Loading...</p>
	</div>
{:else}
	<section class="text-gray-600 body-font w-full md:w-2/3 lg:w-1/2 mb-12">
		<div class="container mx-auto grid place-items-center">
			<form class="w-full bg-gray-100 rounded-b-lg py-12 px-4 md:px-8 flex flex-col">
				<div class="relative mb-4">
					<label
						for="image"
						class="leading-7 text-sm md:text-lg block mb-4 text-gray-600 block mb-4"
						>Image Source</label
					>
					<input
						placeholder="wwww.link.to/your-image"
						bind:value={image}
						type="input"
						id="image"
						name="image"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<div class="relative mb-4">
					<label
						for="title"
						class="leading-7 text-sm md:text-lg block mb-4 text-gray-600 block mb-4">Title</label
					>
					<input
						bind:value={title}
						type="text"
						id="title"
						name="title"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<div class="relative mb-4">
					<label for="description" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
						>Description</label
					>
					<input
						bind:value={description}
						type="text"
						id="description"
						name="description"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<div class="relative mb-4">
					<label for="tags" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
						>Tags</label
					>
					<input
						bind:value={tags}
						type="text"
						id="tags"
						name="tags"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<div class="relative mb-4">
					<label for="ingredients" class="leading-7 text-sm md:text-lg text-gray-600"
						>Ingredients</label
					>
					<ul class="w-full">
						{#each ingredients as ingredient}
							<li class="px-1 py-2 text-gray-500 flex space-x-2">
								<button
									class="w-6 h-6 rounded-full bg-red-400 text-white flex items-center justify-center"
									on:click|preventDefault={() => {
										ingredients = ingredients.filter((i) => i !== ingredient);
									}}>-</button
								>
								<p>{ingredient}</p>
							</li>
						{/each}
					</ul>
					<form class="flex space-x-4 mt-2">
						<input
							bind:value={newIngredient}
							type="text"
							id="ingredients"
							name="ingredients"
							class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
						<button
							type="submit"
							class="text-green-500 border-2 border-green-500 hover:bg-green-100 py-2 px-4 focus:outline-none rounded text-lg"
							on:click|preventDefault={addIngredient}>+</button
						>
					</form>
				</div>
				<div class="relative mb-4">
					<label for="directions" class="leading-7 text-sm md:text-lg text-gray-600"
						>Directions</label
					>
					<ol class="w-full list-decimal">
						{#each directions as direction}
							<li class="px-1 py-2 text-gray-500 flex space-x-2">
								<button
									class="w-6 h-6 rounded-full bg-red-400 text-white flex items-center justify-center"
									on:click|preventDefault={() => {
										directions = directions.filter((i) => i !== direction);
									}}>-</button
								>
								<p>{direction}</p>
							</li>
						{/each}
					</ol>
					<form class="flex space-x-4 mt-2">
						<input
							bind:value={newDirection}
							type="text"
							id="directions"
							name="directions"
							class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
						/>
						<button
							type="submit"
							class="text-green-500 border-2 border-green-500 hover:bg-green-100 py-2 px-4 focus:outline-none rounded text-lg"
							on:click|preventDefault={addDirection}>+</button
						>
					</form>
				</div>
				<button
					on:click|preventDefault={createRecipe}
					type="submit"
					class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
					>Add Recipe</button
				>
				{#if errorMessage}
					<p class="text-xs text-red-500 mt-6 text-center">
						{errorMessage}
					</p>
				{/if}
			</form>
		</div>
	</section>
{/if}
