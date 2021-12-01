<script>
	import { userRecipes } from '$lib/store';
	import { database } from '$lib/supabase';
	export let title, description, image, tags, url, id, own;

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
	<div class="h-full flex flex-col rounded-t-lg overflow-hidden">
		<img class="h-36 lg:h-48 md:h-36 w-full object-cover object-center" src={image} alt={title} />
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
				<a
					href={own ? `/dashboard/recipe/${title.replace(/ /g, '-').toLowerCase()}?id=${id}` : url}
					type="button"
					class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>View</a
				>
			</div>
			<!-- End of Control Buttons -->
		</div>
	</div>
</div>
