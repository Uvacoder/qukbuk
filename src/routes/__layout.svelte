<script>
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SignUp from '$lib/components/SignUp.svelte';
</script>

<div class="h-full flex flex-col justify-between">
	<Navigation />
	<slot />
	<Footer />
</div>
