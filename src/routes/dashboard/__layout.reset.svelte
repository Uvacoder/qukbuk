<script>
	import '../../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<div class="h-full flex flex-col">
	<Navigation />
	<slot />
</div>
