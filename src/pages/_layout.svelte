<script>
    import Nav from '../components/Nav.svelte';
    import Header from '../components/Header.svelte';
    import Login from '../components/Login.svelte';

    import {personalInfoId , currentUser} from '../util/store.js';

    $personalInfoId=0;

  console.log($currentUser);
</script>


<main class="bg-gray-100 dark:bg-gray-800 relative h-screen overflow-hidden relative">
{#if ($currentUser === undefined)}

  <Login />

{:else}

  <div class="flex items-start justify-between">

      <Nav />
      
      <div class="flex flex-col w-full md:space-y-4">
        <Header />


        <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
          <slot />
        </div>

      </div>

    </div>

{/if}
</main>