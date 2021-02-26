<script>
    import { notifier } from '@beyonk/svelte-notifications';
    import Form from "@svelteschool/svelte-forms";
    import Register from './Register.svelte';
    import ToggleDarkMode from './ToggleDarkMode.svelte';
    import {
        loginState, currentUser
    } from '../util/store.js';
    import {extractErrors, loginSchema} from '../util/schemas.js';
    import {loginUser} from '../controllers/userController.js';

    let values;
    let errors={};


    const login = async () => {
        try{
            errors={};
            let response;
            await loginSchema.validate(values,{abortEarly:false});


            response = await loginUser(values);
            console.log(response);
            console.log(response[0]);
            if(response.length === 0){
                notifier.danger('Invalid credentials', 3000);
            }else{
                notifier.success('Login successfull', 3000);
                currentUser.set(response[0]);
                sessionStorage.setItem('currentUser', JSON.stringify(response[0]));
            }
        }catch(err){
            console.log(err);
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };
</script>

<ToggleDarkMode />

{#if $loginState == 'login'}
<div class="flex items-center justify-center w-full mb-12 mt-4">
    <div class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-600 sm:px-6 md:px-8 lg:px-10">
        <div class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Login To Your Account
        </div>
        <div class="mt-8">
            <Form bind:values>
                <div class="flex flex-col mb-2">
                    <div class="flex relative ">
                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <input required name="username" type="text" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your username"/>
                        </div>
                    </div>
                    <div class="flex flex-col mb-6">
                        <div class="flex relative ">
                            <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                    </svg>
                                </svg>
                            </span>
                            <input required name="password" type="password" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password"/>
                            </div>
                        </div>
                        <div class="flex items-center mb-12 -mt-4">
                            
                        </div>
                        <div class="flex w-full">
                            <button on:click|preventDefault={login} class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Login
                            </button>
                        </div>
                    </Form>
                </div>
                <div class="flex items-center justify-center mt-6">
                    <a on:click={() => $loginState='register'} href="#" class="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                        <span class="ml-2">
                            You don&#x27;t have an account?
                        </span>
                    </a>
                </div>
            </div>
    </div>

{:else if $loginState == 'register'}
    <Register />
    
{/if}

<pre>{JSON.stringify(values, undefined, 1)}</pre>