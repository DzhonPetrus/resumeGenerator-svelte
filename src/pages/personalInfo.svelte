<script>
    import {onMount} from 'svelte';

    
    import {  notifier } from '@beyonk/svelte-notifications';

    import Form from "@svelteschool/svelte-forms";
    import { Stretch } from "svelte-loading-spinners";


    import { addPersonalInfo, updatePersonalInfo, getOnePersonalInfo } from "../controllers/personalInfoController";
    import {currentUser, currentUserPersonalInfo} from "../util/store";

    import { extractErrors, personalInfoSchema } from "../util/schemas.js";

    let values;
    let personalInfo;

    let errors={};

    const saveInfo = async () => {
        try{
            let response;
            errors = {};
            await personalInfoSchema.validate(values, {abortEarly:false});

            let newInfo = values;
            if(values.personalInfoId===undefined)
                newInfo = {personalInfoId: null, ...values}
                
            if(values.userId===undefined)
                newInfo = {userId: $currentUser.userId, ...newInfo}

            if(values.photoURL===undefined)
                newInfo = {photoURL: null, ...newInfo}


            if(confirm('Are you sure you want to save your Personal Info?')){
                response = await updatePersonalInfo(newInfo);
                notifier.success(response[0]);
                currentUserPersonalInfo.set(newInfo);
            }
        }catch(err){
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };

    const getInfo = async () => {
        const res = await getOnePersonalInfo($currentUser.userId);
        values.personalInfoId=null;
        if(res!==undefined){
            personalInfo = res;
            values = res;
            currentUserPersonalInfo.set(res);
        }
    };

    personalInfo = getInfo();

    let file;
    let avatar, fileinput=[''];
    const onFileSelected =(e)=>{
        file = e.target.files[0];
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
                avatar = e.target.result
        };
    };

</script>


<h1 class="text-3xl font-semibold text-gray-800 dark:text-white">
    PERSONAL INFORMATION
</h1>

<br />

{#await personalInfo}
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
    </div>
{/await}

<div class="mt-5 md:mt-0 md:col-span-2">

                    <!-- PICTURE UPLOAD -->

    <!-- <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
            {#if avatar}
                <img class="avatar" height="100" width="100" src="{avatar}" alt="d" />
            {/if}
            <div class="col-span-6 sm:col-span-4">
                <label class="block text-sm font-medium text-gray-700"
                    >Avatar</label>
                <img height="50" width="50" class="upload" src="https://static.thenounproject.com/png/625182-200.png" alt="" on:click={()=>{fileinput.click();}} />
                <div class="chan" on:click={()=>{fileinput.click();}}>Choose Image</div>
                <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
            </div>
        </div>
    </div> -->

                    <!-- END OF PICTURE UPLOAD -->

    <Form bind:values>
        <input name="userId" hidden/>
        <input name="personalInfoId" hidden/>
        <input name="photoURL" hidden/>
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-6">
                        <label class="block text-sm font-medium text-gray-700"
                            >Desired Position</label
                        >
                        <input
                            required
                            type="text"
                            name="desiredPosition"
                            autocomplete="desiredPosition"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >First name</label
                        >
                        <input
                            type="text"
                            name="fName"
                            autocomplete="given-name"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent}"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Middle name</label
                        >
                        <input
                            type="text"
                            name="mName"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Last name</label
                        >
                        <input
                            required
                            type="text"
                            name="lName"
                            autocomplete="family-name"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Email address</label
                        >
                        <input
                            required
                            type="email"
                            name="email"
                            autocomplete="email"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Contact Number</label
                        >
                        <input
                            required
                            type="number"
                            maxlength="11"
                            name="contactNo"
                            autocomplete="contactNo"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Birth Date</label
                        >
                        <input
                            required
                            type="date"
                            name="birthDate"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                        <label class="block text-sm font-medium text-gray-700"
                            >Address</label
                        >
                        <input
                            required
                            type="text"
                            name="address"
                            autocomplete="address"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label class="block text-sm font-medium text-gray-700"
                            >City</label
                        >
                        <input
                            required
                            type="text"
                            name="city"
                            autocomplete="city"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label class="block text-sm font-medium text-gray-700"
                            >Province</label
                        >
                        <input
                            required
                            type="text"
                            name="province"
                            autocomplete="province"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-2">
                        <label class="block text-sm font-medium text-gray-700"
                            >Zip Code</label
                        >
                        <input
                            required
                            type="number"
                            name="zipCode"
                            autocomplete="zipCode"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    on:click|preventDefault={saveInfo}
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </div>
        </div>
    </Form>
</div>

<!-- <pre>{JSON.stringify(values, undefined, 1)}</pre> -->