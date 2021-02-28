<script>
    import DataTable from '../components/EBGDataTable.svelte';
    
    import { notifier } from '@beyonk/svelte-notifications';

    import Form from "@svelteschool/svelte-forms";
    import { Stretch } from "svelte-loading-spinners";


    import {deleteEducationBG, updateEducationBG, getAllEducationBGByUserId, addEducationBG } from "../controllers/educationBGController";
    import {currentUser, currentUserEBG} from "../util/store";

    import { extractErrors, educationBGSchema } from "../util/schemas.js";

    let values={};
    $:values.endDate = values.currentStudy !== undefined ? null : values.endDate;
    $:values.currentStudy = values.endDate === null ? 'on' : undefined;

    let errors = {};
    let educationBG;
    let currentSelectedEBG;
    let educationBGState='Add';

    const addEBG = async () => {
        try{
            let response;
            errors = {};
            await educationBGSchema.validate(values, {abortEarly:false});

            let newEBG = values;
                
            if(values.currentStudy!==undefined)
                values.currentStudy=null;

            if(values.userId===undefined)
                newEBG = {userId: $currentUser.userId, ...newEBG};

            if(confirm('Are you sure you want to save your Educational Background?')){
                response = await addEducationBG(newEBG);
                console.log(response);
                notifier.success(response[0]);
                getEducationBG();
                values={};
            }
        }catch(err){
            console.error(err);
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };

    const editEBG = async () => {
        try{
            let response;
            errors = {};
            await educationBGSchema.validate(values, {abortEarly:false});

            let newEBG = values;
               
            if(values.currentStudy!==undefined)
                values.currentStudy=null;

            if(values.userId===undefined)
                newEBG = {userId: currentSelectedEBG[0].userId, ...newEBG};

            if(values.educationId===undefined)
                newEBG = {educationId: currentSelectedEBG[0].educationId, ...newEBG};

            if(confirm('Are you sure you want to update your Educational Background?')){
                response = await updateEducationBG(newEBG);
                notifier.success(response[0]);
                const newArr = $currentUserEBG.filter((EBG,i) => i !== currentSelectedEBG[1]);
                newArr.unshift(newEBG);

                currentUserEBG.set(newArr);
                values={};
            }
        }catch(err){
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };

    const removeEBG = async (e) => {
        const EBG = e.detail;
        const selectedEBGId = EBG[0].educationId;
        let response;

        if(confirm('Are you sure you want to delete Educational Background with index='+EBG[1])){
                response = await deleteEducationBG(selectedEBGId);
                console.log(response);
                notifier.success(response[0]);
                const newArr = $currentUserEBG.filter((ebg,i) => i !== EBG[1]);
                currentUserEBG.set(newArr);
        }
    };

    const getEducationBG = async () => {
        const res = await getAllEducationBGByUserId($currentUser.userId);
        if(res!==undefined || res !== []){
            educationBG = res;
            values = res;
            currentUserEBG.set(res);
        }
    };

    educationBG = getEducationBG();


    const handleClick = () => {
        if(educationBGState === 'Add')
            addEBG();
        if(educationBGState === 'Edit')
            editEBG();
    };

    const handleEdit = (e) => {
        educationBGState = 'Edit';
        values = e.detail[0];
        currentSelectedEBG=e.detail;
    };

    const handleAdd = (e) => {
        educationBGState = 'Add';
        values = {};
    };
</script>

<h1 class="text-3xl font-semibold text-gray-800 dark:text-white">
    EDUCATIONAL BACKGROUND
</h1>
{#await educationBG}
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
    </div>
{:then}
    <DataTable on:edit={handleEdit} on:remove={removeEBG} on:add={handleAdd}/>
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
                            >Education Stage</label
                        >
                        <select name="studyType" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent}" >
                            <option>Primary</option>

                            <option>Secondary</option>

                            <option>Tertiary</option>
                        </select>
                    </div>

                    <div hidden={values.studyType !== 'Tertiary'} class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Course</label
                        >
                        <input
                            
                            type="text"
                            name="course"
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent "
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Institution</label
                        >
                        <input
                            type="text"
                            name="institution"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Location</label
                        >
                        <input
                            type="text"
                            name="location"
                            autocomplete="location"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Start Date</label
                        >
                        <input
                            type="date"
                            name="startDate"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                    </div>

                    <div hidden={values.currentStudy} class="col-span-4 sm:col-span-2">
                        <label class="block text-sm font-medium text-gray-700"
                            >End Date</label
                        >
                        <input
                            type="date"
                            name="endDate"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            
                        />
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                        <label class="block text-sm font-medium text-gray-700">
                                Current Study
                        </label>
                        <input type="checkbox" name="currentStudy" class="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"/>
                    </div>
                    
                </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    on:click|preventDefault={handleClick}
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {educationBGState === 'Add' ? 'Add' : 'Update'}
                </button>
            </div>
        </div>
    </Form>
</div>


<!-- <pre>{JSON.stringify(values, undefined, 1)}</pre> -->