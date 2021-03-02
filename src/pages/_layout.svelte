<script>
    import Nav from '../components/Nav.svelte';
    import Header from '../components/Header.svelte';
    import Login from '../components/Login.svelte';

    import {currentUser, currentUserPersonalInfo} from '../util/store.js';
    import {getOnePersonalInfo} from '../controllers/personalInfoController.js';


    const getInfo = async () => currentUserPersonalInfo.set(await getOnePersonalInfo($currentUser.userId));

    if($currentUserPersonalInfo.length === 0)
      getInfo();

</script>


<main class="bg-gray-100 dark:bg-gray-800 relative h-screen overflow-hidden relative">
{#if ($currentUser === undefined)}

  <Login />

{:else}

  <div class="flex items-start justify-between">

      <Nav />
      
      <div class="flex flex-col w-full md:space-y-4">

        {#if ($currentUserPersonalInfo !== undefined)}
            <Header />
        {/if}


        <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
          <slot />
        </div>

      </div>

    </div>

{/if}
</main>