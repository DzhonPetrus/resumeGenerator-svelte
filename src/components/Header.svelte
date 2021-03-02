<script>
    import {
        url,
        isActive
    } from '@sveltech/routify';

    import ToggleDarkMode from './ToggleDarkMode.svelte';

    import {currentUser, currentUserPersonalInfo} from "../util/store.js";
    import {getOnePersonalInfo} from '../controllers/personalInfoController.js';

    const getProfile = async () => currentUserPersonalInfo.set(await getOnePersonalInfo($currentUser.userId));

    getProfile();
    $: PI = $currentUserPersonalInfo;
    $:fullName = `${PI.fName} ${PI.mName !== null ? PI.mName : ''} ${PI.lName} `;

    const links = [
        ["./index", "Home", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
</svg>`],
        ["./personalInfo", "Personal Information", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
</svg>`],
        ["./workHistory", "Work History", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
</svg>`],
        ["./educationalBG", "Educational Background", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
</svg>`]
    ];

    const toggleDropdown = () => showDropdown = !showDropdown;
    let showDropdown = false;

    const logout = () => {
        localStorage.removeItem('currentUser');
        currentUser.set();
    };
</script>
<header class="w-full h-16 z-40 flex items-center justify-between">

    <!-- <div class="block lg:hidden ml-6">
        <button class="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md">
            <svg width="20" height="20" class="text-gray-400" fill="currentColor" viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                </path>
            </svg>
        </button>
    </div> -->

    <div class="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
        <div class="relative p-1 flex items-center w-full space-x-4 justify-end">
            <span class="w-1 h-8 rounded-lg bg-gray-200">
            </span>
            <a href="#" class="block relative">
                <img alt="profil" src={PI.photoURL} class="mx-auto object-cover rounded-full h-10 w-10 " />
            </a>

<div class="relative inline-block text-left">
    <div>

        <button on:click={toggleDropdown} class="flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
                {fullName}
                <svg width="20" height="20" class="ml-2 text-gray-400" fill="currentColor" viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
                    </path>
                </svg>
            </button>
        
    </div>
    <div hidden={!showDropdown} class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
        <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a on:click={logout} class="hover:text-gray-800 cursor-pointer text-gray-400 w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start" >
                <span class="text-left">
                    <svg width="20" height="20">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" fill="currentColor"/>
                    </svg>
                </span>
                <span class="mx-2 text-sm font-normal">
                    Logout
                </span>
            </a>
        </div>
    </div>
</div>
            
        </div>
    </div>
</header>

