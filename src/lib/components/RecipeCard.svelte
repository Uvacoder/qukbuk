<script>
	import { userRecipes, totalRecipeCount } from '$lib/store';
	import { database } from '$lib/supabase';
	export let title, description, image, tags, url, id, own;

	const deleteRecipe = async () => {
		try {
			await database.remove(id);
			$userRecipes = $userRecipes.filter((recipe) => recipe.id !== id);
			totalRecipeCount.set($userRecipes.length);
		} catch (error) {
			alert(error);
		}
	};
</script>

<div>
	<div class="h-full flex flex-col rounded-t-lg overflow-hidden">
		{#if image}
			<img class="h-36 lg:h-48 md:h-36 w-full object-cover object-center" src={image} alt={image} />
		{:else}
			<img
				class="h-36 lg:h-48 md:h-36 w-full p-8 border border-opacity-60 border-b-0 object-center"
				src="fallback.svg"
				alt="Recipe by Adrien Coquet from NounProject.com"
			/>
		{/if}
		<div
			class="bg-gray-50 border border-gray-200 border-opacity-60 p-6 flex-grow flex flex-col justify-between"
		>
			<div>
				<div class="w-full flex flex-wrap space-x-2 mb-2">
					{#each tags as tag}
						<p
							class="tracking-widest text-xs title-font bg-yellow-100 py-1 px-2 rounded font-medium text-yellow-700"
						>
							{tag}
						</p>
					{/each}
				</div>
				<h1 class="title-font text-xl font-medium text-gray-900 mb-3 line-clamp-1">{title}</h1>
				<p class="leading-relaxed mb-3 line-clamp-3">
					{description}
				</p>
			</div>

			<!-- Control Buttons -->
			<div class="flex items-center justify-between pt-2">
				<button
					on:click={deleteRecipe}
					type="button"
					class="text-red-500 hover:text-red-700 focus:ring-4 focus:ring-red-300"
				>
					<svg
						class="w-7 h-7"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
				<div class="flex items-center gap-2">
					{#if own}
						<a
							href={`/dashboard/recipe/edit?id=${id}`}
							class="text-green-500 hover:text-green-700 focus:ring-4 focus:ring-green-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
								/>
							</svg>
						</a>
					{/if}
					<a
						href={own ? `/dashboard/recipe/view?id=${id}` : url}
						target={own ? '_self' : '_blank'}
						type="button"
						class="flex items-center gap-2 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						>View {#if !own}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						{/if}</a
					>
				</div>
			</div>
			<!-- End of Control Buttons -->
		</div>
	</div>
</div>
