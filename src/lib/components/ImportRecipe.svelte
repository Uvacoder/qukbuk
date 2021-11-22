<script>
	import { database } from '$lib/supabase';
	import { goto } from '$app/navigation';
	let url, tags, errorMessage;

	let loading = false;

	const importRecipe = async () => {
		loading = true;
		try {
			const response = await fetch(
				`http://api.linkpreview.net/?key=${import.meta.env.VITE_LINK_API_KEY}&q=${url}`,
				{ mode: 'cors' }
			);
			const { title, description, image } = await response.json();
			await database.post(
				url,
				title,
				description,
				image,
				tags.split(', '),
				tags.split(', '),
				tags.split(', ')
			);
			goto('/dashboard');
		} catch (error) {
			errorMessage = error;
		}
		loading = false;
	};
</script>

{#if loading}
	<div class="absolute top-0 w-screen h-screen bg-white z-10 grid place-items-center">
		<p>Loading...</p>
	</div>
{:else}
	<section class="text-gray-600 body-font w-full md:w-2/3 lg:w-1/2">
		<div class="container mx-auto grid place-items-center">
			<div class="w-full bg-gray-100 rounded-b-lg py-12 px-4 md:px-8 flex flex-col">
				<div class="relative mb-4">
					<label for="url" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
						>Recipe link</label
					>
					<input
						bind:value={url}
						type="text"
						id="url"
						name="url"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
				</div>
				<div class="relative mb-4">
					<label for="password" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
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
				<button
					on:click|preventDefault={importRecipe}
					type="submit"
					class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
					>Add Recipe</button
				>
				{#if errorMessage}
					<p class="text-xs text-red-500 mt-6 text-center">
						{errorMessage}
					</p>
				{/if}
			</div>
		</div>
	</section>
{/if}
