<script>
	import { userRecipes } from '$lib/store';
	import { database } from '$lib/supabase';
	export let title, description, image, tags, url, id;

	const deleteRecipe = async () => {
		try {
			await database.remove(id);
			$userRecipes = $userRecipes.filter((recipe) => recipe.id !== id);
		} catch (error) {
			alert(error);
		}
	};
</script>

<div class="p-4 md:w-1/3">
	<div
		class="h-full border-2 border-gray-200 border-opacity-60 flex flex-col rounded-lg overflow-hidden"
	>
		<img class="lg:h-48 md:h-36 w-full object-cover object-center" src={image} alt={title} />
		<div class="p-6 flex-grow flex flex-col justify-between">
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
					type="button"
					class="text-red-500 bg-white border border-red-500 hover:bg-red-500 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/></svg
					>
				</button>
				<a
					href={url}
					type="button"
					class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>View</a
				>
			</div>
			<!-- End of Control Buttons -->
		</div>
	</div>
</div>
