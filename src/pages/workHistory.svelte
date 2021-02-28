<script>
    import DataTable from '../components/WHDataTable.svelte';
    
    import {  notifier } from '@beyonk/svelte-notifications';

    import Form from "@svelteschool/svelte-forms";
    import { Stretch } from "svelte-loading-spinners";


    import {deleteWorkHistory, updateWorkHistory, getAllWorkHistoryByUserId, addWorkHistory } from "../controllers/workHistoryController";
    import {currentUser, currentUserWorkHistory} from "../util/store";

    import { extractErrors, workHistorySchema } from "../util/schemas.js";

    let values={};
    $:values.endDate = values.currentWork !== undefined ? null : values.endDate;
    $:values.currentWork = values.endDate === null ? true : undefined;
    let errors = {};
    let workHistory;
    let currentSelectedWH;
    let workHistoryState='Add';

    const addWH = async () => {
        try{
            let response;
            errors = {};
            await workHistorySchema.validate(values, {abortEarly:false});

            let newWH = values;
                
            if(values.currentWork!==undefined)
                values.currentWork=null;

            if(values.userId===undefined)
                newWH = {userId: $currentUser.userId, ...newWH};

            if(confirm('Are you sure you want to save your Work History?')){
                response = await addWorkHistory(newWH);
                notifier.success(response[0]);
                getWorkHistory();
                values={};
            }
        }catch(err){
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };

    const editWH = async () => {
        try{
            let response;
            errors = {};
            await workHistorySchema.validate(values, {abortEarly:false});

            let newWH = values;
                
            if(values.currentWork!==undefined)
                values.currentWork=null;

            if(values.userId===undefined)
                newWH = {userId: currentSelectedWH[0].userId, ...newWH};

            if(values.workHistoryId===undefined)
                newWH = {userId: currentSelectedWH[0].workHistoryId, ...newWH};

            if(confirm('Are you sure you want to update your Work History?')){
                response = await updateWorkHistory(newWH);
                notifier.success(response[0]);
                const newArr = $currentUserWorkHistory.filter((wh,i) => i !== currentSelectedWH[1]);
                newArr.unshift(newWH);

                currentUserWorkHistory.set(newArr);
                values={};
            }
        }catch(err){
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };

    const removeWH = async (e) => {
        const WH = e.detail;
        const selectedWHId = WH[0].workHistoryId;
        let response;

        if(confirm('Are you sure you want to delete Work History with index='+WH[1])){
                response = await deleteWorkHistory(selectedWHId);
                console.log(response);
                notifier.success(response[0]);
                const newArr = $currentUserWorkHistory.filter((wh,i) => i !== WH[1]);
                currentUserWorkHistory.set(newArr);
        }
    };

    const getWorkHistory = async () => {
        const res = await getAllWorkHistoryByUserId($currentUser.userId);
        if(res!==undefined || res !== []){
            workHistory = res;
            values = res;
            currentUserWorkHistory.set(res);
        }
    };

    workHistory = getWorkHistory();


    const handleClick = () => {
        if(workHistoryState === 'Add')
            addWH();
        if(workHistoryState === 'Edit')
            editWH();
    };

    const handleEdit = (e) => {
        workHistoryState = 'Edit';
        values = e.detail[0];
        currentSelectedWH=e.detail;
    };
    const handleAdd = (e) => {
        workHistoryState = 'Add';
        values = {};
    };
</script>

<h1 class="text-3xl font-semibold text-gray-800 dark:text-white">
    WORK HISTORY
</h1>
{#await workHistory}
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
    </div>
{:then}
    <DataTable on:edit={handleEdit} on:remove={removeWH} on:add={handleAdd}/>
{/await}

<div class="mt-5 md:mt-0 md:col-span-2">
    <Form bind:values>
        <input name="userId" hidden/>
        <input name="workHistoryId" hidden/>
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Job Title</label
                        >
                        <input
                            type="text"
                            name="jobTitle"
                            autocomplete="jobTitle"
                            class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent}"
                        />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Employer</label
                        >
                        <input
                            type="text"
                            name="employer"
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

                    <div disabled={values.currentWork} class="col-span-4 sm:col-span-2">
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
                                Current Work
                        </label>
                        <input type="checkbox" name="currentWork" class="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"/>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700"
                            >Job Description</label
                        >
                        <textarea
                            type="text"
                            name="jobDescription"
                            autocomplete="jobDescription"
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
                    
                </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    on:click|preventDefault={handleClick}
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {workHistoryState === 'Add' ? 'Add' : 'Update'}
                </button>
            </div>
        </div>
    </Form>
</div>


<!-- <pre>{JSON.stringify(values, undefined, 1)}</pre> -->