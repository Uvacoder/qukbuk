<script>
	import { auth } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().min(6).max(32).required()
		}),
		onSubmit: ({ email, password }) => {
			auth.signIn(email, password).then((error) => {
				if (error) {
					$errors.auth = error.message;
					return;
				}
				goto('/dashboard');
			});
		}
	});
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-8 mx-auto grid place-items-center">
		<form
			on:submit|preventDefault={handleSubmit}
			class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0"
		>
			<h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign in</h2>
			<div class="relative mb-4">
				<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
				<input
					bind:value={$form.email}
					on:blur={handleChange}
					on:change={handleChange}
					id="email"
					name="email"
					class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
				/>
				{#if $errors.email}
					<small class="text-xs text-red-500 mt-6 text-center">{$errors.email}</small>
				{/if}
			</div>
			<div class="relative mb-4">
				<label for="password" class="leading-7 text-sm text-gray-600">Password</label>
				<input
					bind:value={$form.password}
					type="password"
					id="password"
					name="password"
					on:blur={handleChange}
					on:change={handleChange}
					class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
				/>
				{#if $errors.password}
					<small class="text-xs text-red-500 mt-6 text-center">{$errors.password}</small>
				{/if}
			</div>
			<button
				disabled={$errors.email || $errors.password}
				type="submit"
				class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg disabled:opacity-50 disabled:cursor-default"
				>Sign in</button
			>
			<p class="text-xs text-gray-500 mt-3">
				Don't have an account? <a href="/">Sign up!</a>
			</p>
			{#if $errors.auth}
				<p class="text-xs text-red-500 mt-6 text-center">
					{$errors.auth}
				</p>
			{/if}
		</form>
	</div>
</section>
