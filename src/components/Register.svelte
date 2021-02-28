<script>
    import {  notifier } from '@beyonk/svelte-notifications';
    import Form from "@svelteschool/svelte-forms";
    import {
        loginState, currentUser
    } from '../util/store.js';
    import {extractErrors, registerSchema} from '../util/schemas.js';
    import {registerUser} from '../controllers/userController.js';

    let values = {};


    let errors={};
    let validity=false;
    let samePassword=false;
    $: samePassword = (values.password === values.confirmPassword);

    let userExist;

    const register = async () => {
        try {
            let response;
            errors = {};
            await registerSchema.validate(values,{abortEarly:false});
            let {username, password} = values
            let newUser = {username,password};

            response = await registerUser(newUser);

            userExist = (response === "User already exist");
            if(!userExist){
                notifier.success('User successfully registered.', 2000);
                // TODO
                currentUser.set(response);
                localStorage.setItem('currentUser', JSON.stringify(response[0]));
            }else{
                notifier.danger('Username already taken.', 2000);
            }
        }catch(err){
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }

    };

</script>


<div class="flex items-center justify-center w-full mb-12 mt-4">
    <div class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-600 sm:px-6 md:px-8 lg:px-10">
        <div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
            Create a new account
        </div>
        <span class="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
            Already have an account ?
            <a on:click={()=> $loginState='login'} href="#" class="text-sm text-blue-500 underline hover:text-blue-700">
                Sign in
            </a>
        </span>
        <div class="mt-8">
            <Form bind:values>
                <div class="flex flex-col mb-4">
                    <div class="flex relative ">
                        <span
                            class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd" />
                                </svg>
                        </span>
                        <input required name="username" type="text"
                            class="{userExist ? 'ring-red-500' : ''} rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Your new username" />
                    </div>
                </div>
                <div class="flex flex-col mb-4">
                    <div class="flex relative ">
                        <span
                            class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </svg>
                        </span>
                        <input required name="password" type="password"
                            class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Your new password" />
                    </div>
                </div>
                <div class="flex flex-col mb-4">
                    <div class="flex relative ">
                        <span
                            class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792"
                                xmlns="http://www.w3.org/2000/svg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                </svg>
                            </svg>
                        </span>
                        <input required name="confirmPassword" type="password"
                            class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Confirm password" />
                    </div>
                </div>
                <div class="flex items-center mb-12 -mt-4"> </div>
                <div class="flex w-full">
                    <button on:click|preventDefault={register}
                        class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Register
                    </button>
                </div>
            </Form>
            <div class="flex items-center mb-12 -mt-4"> </div>

        </div>
    </div>
</div>