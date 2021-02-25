<script>
    import { url, isActive } from "@sveltech/routify";
    const links = [
        [
            "./index",
            "Home",
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
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
    ];

    let showDropdown = false;
    let photoURL =
        "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";

    let isDarkMode = false;
    $: isDarkMode
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");
</script>

<div class="h-screen hidden lg:block shadow-lg relative w-80">
    <div class="bg-white h-full dark:bg-gray-700">
        <div class="flex items-center justify-start pt-6 ml-8">
            <p class="font-bold dark:text-white text-xl">ResumeGenerator</p>
        </div>

        <div class="flex items-center justify-center w-full mb-12 mt-4">
            <div class="mr-3 text-gray-700 font-medium">
                {@html !isDarkMode ? `<svg width="32" height="32" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 2a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0V3.4A1.4 1.4 0 0116 2zM6.1 6.1a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 11-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm19.8 0a1.4 1.4 0 010 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99a1.4 1.4 0 011.98 0zM9 16a7 7 0 1114 0 7 7 0 01-14 0zm-7 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8H3.4A1.4 1.4 0 012 16zm23.8 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8h-1.4a1.4 1.4 0 01-1.4-1.4zm-2.87 6.93a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 01-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm-15.84 0a1.4 1.4 0 011.98 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99zM16 25.8a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0v-1.4a1.4 1.4 0 011.4-1.4z" fill="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop class="transition-all duration-200" stop-color="#FACC15"></stop><stop class="transition-all duration-200" offset="1" stop-color="#FA9D16"></stop></linearGradient></defs></svg>` : `<svg width="32" height="32" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 2a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0V3.4A1.4 1.4 0 0116 2zM6.1 6.1a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 11-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm19.8 0a1.4 1.4 0 010 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99a1.4 1.4 0 011.98 0zM9 16a7 7 0 1114 0 7 7 0 01-14 0zm-7 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8H3.4A1.4 1.4 0 012 16zm23.8 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8h-1.4a1.4 1.4 0 01-1.4-1.4zm-2.87 6.93a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 01-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm-15.84 0a1.4 1.4 0 011.98 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99zM16 25.8a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0v-1.4a1.4 1.4 0 011.4-1.4z" fill="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop class="transition-all duration-200" stop-color="#d4d4d8"></stop><stop class="transition-all duration-200" offset="1" stop-color="#d4d4d8"></stop></linearGradient></defs></svg>`}
            </div>
            <!-- Toggle Button -->
            <label for="toogleA" class="flex items-center cursor-pointer">
                <!-- toggle -->
                <div class="relative">
                    <!-- input -->
                    <input bind:checked={isDarkMode} id="toogleA" type="checkbox" class="hidden" />
                    <!-- line -->
                    <div
                        class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
                    />
                    <!-- dot -->
                    <div
                        class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"
                    />
                </div>
                <!-- label -->
                
                <div class="ml-3 text-gray-700 font-medium">
                    {@html !isDarkMode ? `<svg width="24" height="24" fill="currentColor" class="transition-colors duration-200 text-gray-300"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.353 2.939a1 1 0 01.22 1.08 8 8 0 0010.408 10.408 1 1 0 011.301 1.3A10.003 10.003 0 0112 22C6.477 22 2 17.523 2 12c0-4.207 2.598-7.805 6.273-9.282a1 1 0 011.08.22z"></path></svg>` : `<svg width="24" height="24" fill="currentColor" class="transition-colors duration-200 text-gray-900"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.353 2.939a1 1 0 01.22 1.08 8 8 0 0010.408 10.408 1 1 0 011.301 1.3A10.003 10.003 0 0112 22C6.477 22 2 17.523 2 12c0-4.207 2.598-7.805 6.273-9.282a1 1 0 011.08.22z"></path></svg>`}
                </div>
            </label>
        </div>

        <nav class="mt-6">
            <div>
                {#each links as [path, name, icon]}
                    <a
                        class="{$isActive(path)
                            ? 'border-l-4 border-purple-500 dark:text-white text-gray-800'
                            : 'text-gray-400'} w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start "
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
        </nav>
    </div>
</div>

<style>
    .toggle__dot {
        top: -0.25rem;
        left: -0.25rem;
        transition: all 0.3s ease-in-out;
    }

    input:checked ~ .toggle__dot {
        transform: translateX(100%);
        background-color: #48bb78;
    }
</style>
