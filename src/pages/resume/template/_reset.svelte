<script>
    import html2pdf from 'html2pdf.js';
    import {onMount} from 'svelte';
    import { goto } from "@sveltech/routify";

    import { getOnePersonalInfo } from '../../../controllers/personalInfoController';
    import { getAllWorkHistoryByUserId } from '../../../controllers/workHistoryController';
    import { getAllEducationBGByUserId } from '../../../controllers/educationBGController';
    import { getAllCharacterRefByUserId } from '../../../controllers/characterRefController';

    import {currentUser, currentUserPersonalInfo, currentUserWorkHistory, currentUserEBG, currentUserCharacterRef} from '../../../util/store.js';


    const getInfo = async () => {
        if($currentUserPersonalInfo.length === 0)
            currentUserPersonalInfo.set(await getOnePersonalInfo($currentUser.userId));

        if($currentUserWorkHistory.length === 0)
            currentUserWorkHistory.set(await getAllWorkHistoryByUserId($currentUser.userId));
        
        if($currentUserCharacterRef.length === 0)
            currentUserEBG.set(await getAllEducationBGByUserId($currentUser.userId));
        
        if($currentUserCharacterRef.length === 0)
            currentUserCharacterRef.set(await getAllCharacterRefByUserId($currentUser.userId));
    };


    onMount(async () => {
        await getInfo();
    });


    const handleSave = () => {
        let opt = { 
            margin: 0,
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
            image: { type: 'jpeg', quality: 1 } 
        };
        html2pdf().set(opt).from(document.getElementById('resume')).save();
    }
</script>

<!-- <button on:click={() => $goto('/resume')}>Go back</button> -->

<button on:click={handleSave} type="button" class="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg ">
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M9.707 7.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L13 8.586V5h3a2 2 0 012 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2h3v3.586L9.707 7.293zM11 3a1 1 0 112 0v2h-2V3z" />
  <path d="M4 9a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2H4V9z" />
</svg>
    </svg>
     Save as PDF
</button>



{#if ($currentUser === undefined)}

    {$goto('/')}

{:else}
    <slot>
    </slot>
{/if}