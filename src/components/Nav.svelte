<script>
    import { url, isActive } from "@sveltech/routify";
    import ToggleDarkMode from './ToggleDarkMode.svelte';
    import {currentUser, currentUserPersonalInfo} from "../util/store.js";
    const links = [
        [
            "./index",
            "Account Settings",
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
</svg>`,
        ],
        [
            "./personalInfo",
            "Personal Information",
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
</svg>`,
        ],
        [
            "./workHistory",
            "Work History",
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
</svg>`,
        ],
        [
            "./educationalBG",
            "Educational Background",
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
</svg>`,
        ],
        [
            "./characterRef",
            "Character Reference",
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
</svg>`,
        ],
        [
            "./resume",
            "Resume",
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
</svg>`,
        ]
    ];

    let showDropdown = false;
    let photoURL =
        "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";

    const logout = () => {
        localStorage.removeItem('currentUser');
        currentUser.set();
    };

</script>

<div class="h-screen hidden lg:block shadow-lg relative w-80">
    <div class="bg-white h-full dark:bg-gray-700">
        <div class="flex items-center justify-start pt-6 ml-8">
            <p class="font-bold dark:text-white text-xl">ResumeGenerator</p>
        </div>

        <ToggleDarkMode />

        <nav class="mt-6">
            <div>
                {#each links as [path, name, icon]}
                    <a
                        class="{$isActive(path)
                            ? 'border-l-4 border-purple-500 dark:text-white text-gray-800'
                            : 'text-gray-400'} w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 "
                        href={$url(path)}
                    >
                        <span class="text-left">
                            <svg width="20" height="20">
                                {@html icon}
                            </svg>
                        </span>
                        <span class="mx-2 text-sm font-normal">
                            {name}
                        </span>
                    </a>
                {/each}
            </div>
        {#if ($currentUserPersonalInfo.personalInfoId === undefined)}
            <br/><hr />
            <a on:click={ logout} class="hover:text-gray-800 cursor-pointer text-gray-400 w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start" >
                <span class="text-left">
                    <svg width="20" height="20">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" fill="currentColor"/>
                    </svg>
                </span>
                <span class="mx-2 text-sm font-normal">
                    Logout
                </span>
            </a>
        {/if}
        </nav>
    </div>
</div>

