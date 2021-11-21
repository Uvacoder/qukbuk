<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SignUp from '$lib/components/SignUp.svelte';
</script>

<div class="h-full flex flex-col justify-between">
	<Header />
	<slot />
	<Footer />
</div>
