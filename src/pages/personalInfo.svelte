<script>
    import {onMount} from 'svelte';

    import Form from "@svelteschool/svelte-forms";
    import { Stretch } from "svelte-loading-spinners";


    import { addPersonalInfo, updatePersonalInfo, getOnePersonalInfo, getAllPersonalInfo, personalInfoId } from "../stores/personalInfoStore";

    import { personalInfoSchema } from "../schemas/personalInfoSchema.js";

    let values;
    let personalInfo;

    let validity=false;


    const saveInfo = async () => {
        validity = await personalInfoSchema.isValid(values);
        if(validity){
            let newInfo = values;
            if(values.personalInfoId===undefined)
                newInfo = {personalInfoId: personalInfo.personalInfoId, ...values}
                
            if(values.userId===undefined)
                newInfo = {userId: 3, ...newInfo}

            if(values.photoURL===undefined)
                newInfo = {photoURL: personalInfo.photoURL, ...newInfo}

            let response = await updatePersonalInfo(newInfo);
            console.log(response);
        }
    };


    onMount(async () => {
        const res = await getOnePersonalInfo($personalInfoId);
        if(res!==undefined){
            personalInfo = res;
            values = res;
        }
    });
</script>

<h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
    PERSONAL INFORMATION
</h1>

<br />

{#await values}
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
                            required
                            type="text"
                            name="fName"
                            autocomplete="given-name"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Middle name</label
                        >
                        <input
                            required
                            type="text"
                            name="mName"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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

<pre>{JSON.stringify(values, undefined, 1)}</pre>

<button on:click={() => console.log(values)}>
    Check 'dat two-way binding!
</button>