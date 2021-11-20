<script>
	import { auth } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let email, password, errorMessage;

	const handleSignIn = () => {
		auth.signIn(email, password).then((error) => {
			if (error) {
				errorMessage = error.message;
				return;
			}
			goto('/dashboard');
		});
	};
</script>

<section class="text-gray-600 body-font">
	<div class="container px-5 py-24 mx-auto grid place-items-center">
		<div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
			<h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign in</h2>
			<div class="relative mb-4">
				<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
				<input
					bind:value={email}
					type="email"
					id="email"
					name="email"
					class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
				/>
			</div>
			<div class="relative mb-4">
				<label for="password" class="leading-7 text-sm text-gray-600">Password</label>
				<input
					bind:value={password}
					type="password"
					id="password"
					name="password"
					class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
				/>
			</div>
			<button
				on:click={handleSignIn}
				class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
				>Sign in</button
			>
			<p class="text-xs text-gray-500 mt-3">
				Don't have an account? <a href="/">Sign up!</a>
			</p>
			{#if errorMessage}
				<p class="text-xs text-red-500 mt-6 text-center">
					{errorMessage}
				</p>
			{/if}
		</div>
	</div>
</section>
