<script>
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/store';
  import { auth } from '$lib/supabase';
  import Loading from '$lib/components/Loading.svelte';

  let loading = true;
  let name, email, emailConf, password, passwordConf;

  let emailSuccess;
  let emailError;

  let passwordSuccess;
  let passwordError;

  onMount(() => {
    auth.session();
    loading = false;
  })



  const updateName = async () => {
    loading = true;
    const { user, error } = await auth.updateName(name)
    name = null;
    loading = false;
  }

  const updateEmail = async () => {
    if (email === $currentUser.email) {
      emailError = 'Email already in use.'
      return;
    }
    loading = true;
    emailSuccess = false;
    const { user, error } = await auth.updateEmail(email);
    if (error) {
      emailError = error.message;
      loading = false;
      return;
    }
    if (user) {
      emailSuccess = true;
    }
    email = null;
    emailConf = null;
    loading = false;
  }

  const updatePassword = async () => {
    loading = true;
    passwordSuccess = false;
    const { user, error } = await auth.updatePassword(password)
    if (error) {
      passwordError = error.message;
      loading = false;
      return;
    }
    if (user) {
      passwordSuccess = true;
    }
    password = null;
    passwordConf = null;
    loading = false;
  }
</script>

{#if loading}
<section class="absolute top-0 w-screen h-screen grid place-items-center">
  <Loading />
</section>
{:else}
<main class="container max-w-screen-md px-5 pt-4 md:pt-8 pb-12 mx-auto flex flex-col">
  <h1 class='text-2xl font-bold'>Settings</h1>
  <hr class='my-2'>
  <div class="flex flex-col space-y-6">

  <form class='flex flex-col space-y-2' on:submit|preventDefault={updateName}>
    <label for="name">Name: {$currentUser.user_metadata.name}</label>
    <input required class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="text" name="name" placeholder='New Name' bind:value={name}>
    <button class="self-end text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg" type="submit" name="button">Save</button>
    <hr>
  </form>
  <form class='flex flex-col space-y-2' on:submit|preventDefault={updateEmail}>
    <label for="email">Email: {$currentUser.email}</label>
    <input required class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="email" name="email" placeholder='New Email' bind:value={email}>
    <input required class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="email" placeholder='New Email Confirmation' bind:value={emailConf}>
    {#if emailSuccess}
      <p class='text-sm text-green-500'>Confirmation email has been sent!</p>
    {:else if emailError}
      <p class='text-sm text-red-500'>{emailError}</p>
    {/if}
    <button disabled={email !== emailConf} class="disabled:opacity-50 self-end text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg" type="submit" name="button">Save</button>
    <hr>
  </form>
  <form class='flex flex-col space-y-2' on:submit|preventDefault={updatePassword}>
    <label for="password">Password</label>
    <input class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="password" name="password" placeholder='New Password' bind:value={password}>
    <input class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="password" placeholder='New Password Confirmation' bind:value={passwordConf}>
    {#if passwordSuccess}
      <p class='text-sm text-green-500'>Password changed successfully!</p>
    {:else if passwordError}
      <p class='text-sm text-red-500'>{passwordError}</p>
    {/if}
    <button disabled={password !== passwordConf} class="disabled:opacity-50 self-end text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg" type="submit" name="button">Save</button>
  </form>
</div>
</main>
{/if}
