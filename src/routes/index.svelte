<script>
	import { currentSession } from '$lib/store';

	import { onMount } from 'svelte';
	import { auth } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import SignUp from '$lib/components/SignUp.svelte';

	onMount(() => {
		auth.session();
		$currentSession ? goto('/dashboard') : goto('/');
	});
</script>

<SignUp />
