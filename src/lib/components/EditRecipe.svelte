<script>
	import Loading from '$lib/components/Loading.svelte';
	import { database } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { page } from '$app/stores';

	let loading = false;

	export let initialRecipe;
	export let recipeId;

	let newIngredient = '';
	let ingredients = [...initialRecipe.ingredients];

	const addIngredient = () => {
		ingredients = [...ingredients, newIngredient];
		newIngredient = '';
	};

	let newDirection = '';
	let directions = [...initialRecipe.directions];

	const addDirection = () => {
		directions = [...directions, newDirection];
		newDirection = '';
	};

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			image: initialRecipe.image,
			title: initialRecipe.title,
			description: initialRecipe.description,
			tags: initialRecipe.tags.toString().replace(',', ', ')
		},
		validationSchema: yup.object().shape({
			image: yup.string().url(),
			title: yup.string().min(6).max(64).required(),
			description: yup.string().min(6).max(280).required(),
			tags: yup
				.string()
				.min(3)
				.max(64)
				.matches(/^[a-z]+(, [a-z]+)*$/, 'must be a list of one or more comma separated words')
				.required()
		}),
		onSubmit: async ({ image, title, description, tags }) => {
			loading = true;
			try {
				await database.update(
					recipeId,
					title,
					description,
					image,
					tags.split(', '),
					ingredients,
					directions
				);
			} catch (error) {
				$errors.fail = error.message;
			}
			goto('/dashboard');
		}
	});
</script>

{#if loading}
	<div class="absolute top-0 w-screen h-screen bg-white z-50 grid place-items-center">
		<Loading />
	</div>
{:else}
	<section class="text-gray-600 body-font w-full md:w-2/3 lg:w-1/2 mb-12">
		<div class="container mx-auto grid place-items-center">
			<form
				on:submit|preventDefault={handleSubmit}
				class="w-full bg-gray-100 rounded-b-lg py-12 px-4 md:px-8 flex flex-col"
			>
				<div class="relative mb-4">
					<label for="image" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
						>Image Source</label
					>
					<input
						placeholder="wwww.link.to/your-image"
						bind:value={$form.image}
						on:blur={handleChange}
						on:change={handleChange}
						id="image"
						name="image"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
					{#if $errors.image}
						<small class="text-xs text-red-500 mt-6 text-center">{$errors.image}</small>
					{/if}
				</div>
				<div class="relative mb-4">
					<label for="title" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
						>Title</label
					>
					<input
						bind:value={$form.title}
						on:blur={handleChange}
						on:change={handleChange}
						id="title"
						name="title"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
					{#if $errors.title}
						<small class="text-xs text-red-500 mt-6 text-center">{$errors.title}</small>
					{/if}
				</div>
				<div class="relative mb-4">
					<label for="description" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
						>Description</label
					>
					<textarea
						bind:value={$form.description}
						on:blur={handleChange}
						on:change={handleChange}
						type=""
						id="description"
						name="description"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
					{#if $errors.description}
						<small class="text-xs text-red-500 mt-6 text-center">{$errors.description}</small>
					{/if}
				</div>
				<div class="relative mb-4">
					<label for="tags" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
						>Tags</label
					>
					<input
						bind:value={$form.tags}
						on:blur={handleChange}
						on:change={handleChange}
						id="tags"
						name="tags"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
					{#if $errors.tags}
						<small class="text-xs text-red-500 mt-6 text-center">{$errors.tags}</small>
					{/if}
				</div>
				<div class="relative mb-4">
					<label for="ingredients" class="leading-7 text-sm md:text-lg text-gray-600"
						>Ingredients</label
					>
					<ul class="w-full">
						{#each ingredients as ingredient}
							<li class="px-1 py-2 text-gray-500 flex space-x-2">
								<button
									class="text-gray-400 hover:text-gray-500"
									on:click|preventDefault={() => {
										ingredients = ingredients.filter((i) => i !== ingredient);
									}}
								>
									<svg
										class="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
											clip-rule="evenodd"
										/></svg
									>
								</button>
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
							disabled={!newIngredient}
							class="text-gray-400 hover:text-gray-500"
							type="submit"
							on:click|preventDefault={addIngredient}
						>
							<svg
								class="w-8 h-8"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
									clip-rule="evenodd"
								/></svg
							>
						</button>
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
									class="text-gray-400 hover:text-gray-500"
									on:click|preventDefault={() => {
										directions = directions.filter((i) => i !== direction);
									}}
								>
									<svg
										class="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
											clip-rule="evenodd"
										/></svg
									>
								</button>
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
							disabled={!newDirection}
							class="text-gray-400 hover:text-gray-500"
							type="submit"
							on:click|preventDefault={addDirection}
						>
							<svg
								class="w-8 h-8"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
									clip-rule="evenodd"
								/></svg
							>
						</button>
					</form>
				</div>
				<button
					disabled={$errors.title || $errors.description || $errors.tags}
					type="submit"
					class="disabled:opacity-50 disabled:cursor-default text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
					>Save changes</button
				>
				{#if $errors.fail}
					<p class="text-xs text-red-500 mt-6 text-center">
						{$errors.fail}
					</p>
				{/if}
			</form>
		</div>
	</section>
{/if}
