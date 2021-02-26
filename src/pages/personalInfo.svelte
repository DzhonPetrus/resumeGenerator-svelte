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
</script>


<h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
    PERSONAL INFORMATION
</h1>

<br />

{#await personalInfo}
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
    </div>
{/await}

<div class="mt-5 md:mt-0 md:col-span-2">
    <Form bind:values>
        <input name="userId" hidden/>
        <input name="personalInfoId" hidden/>
        <input name="photoURL" hidden/>
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
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
                        {#if errors.fName}
                        <p class="text-sm text-red-500 -bottom-6">
                            {errors.fName}
                        </p>
                        {/if}
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
                        {#if errors.lName}
                        <p class="absolute text-sm text-red-500 -bottom-6">
                            {errors.lName}
                        </p>
                        {/if}
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
                        {#if errors.email}
                        <p class="absolute text-sm text-red-500 -bottom-6">
                            {errors.email}
                        </p>
                        {/if}
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
                        {#if errors.contactNo}
                        <p class="absolute text-sm text-red-500 -bottom-6">
                            {errors.contactNo}
                        </p>
                        {/if}
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
                        {#if errors.birthDate}
                        <p class="absolute text-sm text-red-500 -bottom-6">
                            {errors.birthDate}
                        </p>
                        {/if}
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
                        {#if errors.address}
                        <p class="absolute text-sm text-red-500 -bottom-6">
                            {errors.address}
                        </p>
                        {/if}
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
                        {#if errors.city}
                        <p class="absolute text-sm text-red-500 -bottom-6">
                            {errors.city}
                        </p>
                        {/if}
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
                        {#if errors.province}
                        <p class="absolute text-sm text-red-500 -bottom-6">
                            {errors.province}
                        </p>
                        {/if}
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
                        {#if errors.zipCode}
                        <p class="absolute text-sm text-red-500 -bottom-6">
                            {errors.zipCode}
                        </p>
                        {/if}
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