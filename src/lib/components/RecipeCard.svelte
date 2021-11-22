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
				<h1 class="title-font text-xl font-medium text-gray-900 mb-3">{title}</h1>
				<p class="leading-relaxed mb-3 line-clamp-3">
					{description}
				</p>
			</div>

			<!-- Control Buttons -->
			<div class="flex items-center justify-between pt-8">
				<button class="text-red-500 hover:underline" on:click={deleteRecipe}>Delete</button>
				<div class="flex items-center flex-wrap">
					<a
						href={url}
						class="text-green-500 hover:underline inline-flex items-center md:mb-2 lg:mb-0"
						>See Recipe
						<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14" />
							<path d="M12 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
			<!-- End of Control Buttons -->
		</div>
	</div>
</div>
