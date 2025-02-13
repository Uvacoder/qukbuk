<script>
	import Loading from '$lib/components/Loading.svelte';
	import { database } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	let loading = false;

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			url: '',
			tags: ''
		},
		validationSchema: yup.object().shape({
			url: yup.string().url().required(),
			tags: yup
				.string()
				.min(3)
				.max(64)
				.matches(/^[a-z]+(, [a-z]+)*$/, 'must be a list of one or more comma separated words')
				.required()
		}),
		onSubmit: async ({ url, tags }) => {
			loading = true;
			try {
				const response = await fetch(
					`https://api.linkpreview.net/?key=${import.meta.env.VITE_LINK_API_KEY}&q=${url}`,
					{ mode: 'cors' }
				).then();
				const { title, description, image } = await response.json();
				await database.post(url, title, description, image, tags.split(', '), null, null, false);
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
	<section class="text-gray-600 body-font w-full md:w-2/3 lg:w-1/2">
		<div class="container mx-auto grid place-items-center">
			<form
				on:submit|preventDefault={handleSubmit}
				class="w-full bg-gray-100 rounded-b-lg py-12 px-4 md:px-8 flex flex-col"
			>
				<div class="relative mb-4">
					<label for="url" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
						>Recipe link</label
					>
					<input
						bind:value={$form.url}
						on:blur={handleChange}
						on:change={handleChange}
						id="url"
						name="url"
						class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>
					{#if $errors.url}
						<small class="text-xs text-red-500 mt-6 text-center">{$errors.url}</small>
					{/if}
				</div>
				<div class="relative mb-4">
					<label for="password" class="leading-7 text-sm md:text-lg block mb-4 text-gray-600"
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
				<button
					disabled={$errors.url || $errors.tags}
					type="submit"
					class="disabled:opacity-50 disabled:cursor-default text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
					>Add Recipe</button
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
