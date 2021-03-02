<script>
  import {  notifier } from '@beyonk/svelte-notifications';
  import Form from "@svelteschool/svelte-forms";

  import {updatePassword, loginUser} from '../controllers/userController.js';
  import {currentUser} from '../util/store.js';
  import { extractErrors, accountPasswordSchema } from "../util/schemas.js";

  let values;
  let errors={};

    const updateAccount = async () => {
        try{
            let response;
            errors = {};
            await accountPasswordSchema.validate(values, {abortEarly:false});


            if(confirm('Are you sure you want to update your Password?')){

              let loginCredential = {username: $currentUser.username, password: values.oldPassword}
              response = await loginUser(loginCredential);
              if(response.length === 0){
                  notifier.danger('Invalid Old Password', 3000);
              }else{
                  let newAccount = {userId: $currentUser.userId, username: $currentUser.username, password:values.newPassword};

                  response = await updatePassword(newAccount);
                  notifier.success('Account has been successfully updated', 3000);
                  currentUser.set(newAccount);
                  localStorage.setItem('currentUser', JSON.stringify(newAccount));
              }

            }
        }catch(err){
            errors = extractErrors(err);
            errors = Object.values(errors);
            errors.reverse().forEach(e => notifier.danger(e, 4000));
        }
    };

</script>

<section class="h-screen bg-white dark:bg-gray-700">
  <br /> <br /> <br />
  <div class="container max-w-2xl mx-auto shadow-md md:w-3/4">
    <div class="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
      <div class="max-w-sm mx-auto md:w-full md:mx-0">
        <div class="inline-flex items-center space-x-4">
          <h1 class="text-gray-900 font-bold text-2xl justify-center items-center flex ">
            ACCOUNT SETTINGS
          </h1>
        </div>
      </div>
    </div>
    <hr />
    <div class="space-y-6 bg-white">
      <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
        <h2 class="max-w-sm mx-auto md:w-1/3">
          Username
        </h2>
        <div class="max-w-sm mx-auto md:w-2/3">
          <div class=" relative ">
            <input disabled type="text" 
              class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Username" value={$currentUser.username}/>
          </div>
        </div>
      </div>
      <hr />
      <Form bind:values>
      <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
        <h2 class="max-w-sm mx-auto md:w-1/3">
          New Password
        </h2>
        <div class="max-w-sm mx-auto md:w-2/3">
          <div class=" relative ">
            <input type="password" name="newPassword"
              class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="New Password" />
          </div>
        </div>
      </div>
      <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
        <h2 class="max-w-sm mx-auto md:w-1/3">
          Confirm New Password
        </h2>
        <div class="max-w-sm mx-auto md:w-2/3">
          <div class=" relative ">
            <input type="password" name="confirmNewPassword"
              class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Confirm New Password" />
          </div>
        </div>
      </div>
      <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
        <h2 class="max-w-sm mx-auto md:w-1/3">
          Old Password
        </h2>
        <div class="max-w-sm mx-auto md:w-2/3">
          <div class=" relative ">
            <input type="password" name="oldPassword"
              class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Old Password" />
          </div>
        </div>
      </div>
    </Form>
      <hr />
      <div class="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
        <button on:click={updateAccount}
          class="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
          Update
        </button>
      </div>
    </div>
  </div>
</section>

<pre>{JSON.stringify(values, undefined, 1)}</pre>