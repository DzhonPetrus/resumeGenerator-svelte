<script>
    import DataTable from '../components/CharacterRefDataTable.svelte';
    
    import { notifier } from '@beyonk/svelte-notifications';

    import Form from "@svelteschool/svelte-forms";
    import { Stretch } from "svelte-loading-spinners";


    import {deleteCharacterRef, updateCharacterRef, getAllCharacterRefByUserId, addCharacterRef } from "../controllers/characterRefController";
    import {currentUser, currentUserCharacterRef} from "../util/store";

    import { extractErrors, characterRefSchema } from "../util/schemas.js";

    let values={};

    let errors = {};
    let characterRef;
    let currentSelectedCharacterRef;
    let characterRefState='Add';

    const addCharRef = async () => {
        try{
            let response;
            errors = {};
            await characterRefSchema.validate(values, {abortEarly:false});

            let newCharacterRef = values;
                

            if(values.userId===undefined)
                newCharacterRef = {userId: $currentUser.userId, ...newCharacterRef};

            if(confirm('Are you sure you want to save your Character Reference?')){
                response = await addCharacterRef(newCharacterRef);
                console.log(response);
                notifier.success(response[0]);
                getCharacterRef();
                values={};
            }
        }catch(err){
            console.error(err);
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };

    const editCharRef = async () => {
        try{
            let response;
            errors = {};
            await characterRefSchema.validate(values, {abortEarly:false});

            let newCharacterRef = values;
               
            if(values.userId===undefined)
                newCharacterRef = {userId: currentSelectedCharacterRef[0].userId, ...newCharacterRef};

            if(values.educationId===undefined)
                newCharacterRef = {charRefId: currentSelectedCharacterRef[0].charRefId, ...newCharacterRef};

            if(confirm('Are you sure you want to update your Character Reference?')){
                response = await updateCharacterRef(newCharacterRef);
                notifier.success(response[0]);
                const newArr = $currentUserCharacterRef.filter((CharacterRef,i) => i !== currentSelectedCharacterRef[1]);
                newArr.unshift(newCharacterRef);

                currentUserCharacterRef.set(newArr);
                values={};
            }
        }catch(err){
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };

    const removeCharRef = async (e) => {
        const CharacterRef = e.detail;
        const selectedCharacterRefId = CharacterRef[0].charRefId;
        let response;

        if(confirm('Are you sure you want to delete Character Reference with index='+CharacterRef[1])){
                response = await deleteCharacterRef(selectedCharacterRefId);
                console.log(response);
                notifier.success(response[0]);
                const newArr = $currentUserCharacterRef.filter((ebg,i) => i !== CharacterRef[1]);
                currentUserCharacterRef.set(newArr);
        }
    };

    const getCharacterRef = async () => {
        const res = await getAllCharacterRefByUserId($currentUser.userId);
        if(res!==undefined || res !== []){
            characterRef = res;
            currentUserCharacterRef.set(res);
        }
    };

    characterRef = getCharacterRef();


    const handleClick = () => {
        if(characterRefState === 'Add')
            addCharRef();
        if(characterRefState === 'Edit')
            editCharRef();
    };

    const handleEdit = (e) => {
        characterRefState = 'Edit';
        values = e.detail[0];
        currentSelectedCharacterRef=e.detail;
    };

    const handleAdd = (e) => {
        characterRefState = 'Add';
        values = {};
    };
</script>

<h1 class="text-3xl font-semibold text-gray-800 dark:text-white">
    CHARACTER REFERENCES
</h1>
{#await characterRef}
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
    </div>
{:then}
    <DataTable on:edit={handleEdit} on:remove={removeCharRef} on:add={handleAdd}/>
{/await}

<div class="mt-5 md:mt-0 md:col-span-2">
    <Form bind:values>
        <input name="userId" hidden/>
        <input name="educationalId" hidden/>
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">


                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Full Name</label
                        >
                        <input
                            type="text"
                            name="name"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Job Title</label
                        >
                        <input
                            type="text"
                            name="jobTitle"
                            autocomplete="jobTitle"
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
                </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    on:click|preventDefault={handleClick}
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {characterRefState === 'Add' ? 'Add' : 'Update'}
                </button>
            </div>
        </div>
    </Form>
</div>


<!-- <pre>{JSON.stringify(values, undefined, 1)}</pre> -->