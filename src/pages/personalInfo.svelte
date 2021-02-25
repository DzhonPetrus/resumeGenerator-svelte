<script>
    import Form from '@svelteschool/svelte-forms';
    import { Stretch } from 'svelte-loading-spinners';
    import { getPersonalInfo, personalInfoId } from '../stores/personalInfoStore';



    $: personalInfo = getPersonalInfo($personalInfoId);
    $: console.log(personalInfo);

    let values;
</script>


<h1 class="text-4xl font-semibold text-gray-800 dark:text-white">PERSONAL INFORMATION</h1>
<h2 class="text-md text-gray-400">Input your personal information in the form below</h2>




<Form bind:values>
    <input class="form-input form-input-dark form-input-sm">
  <fieldset>
    <input placeholder="First name" type="text" name="fName" required/>
		<input placeholder="Middle name" type="text" name="mName" />
    <input placeholder="Last name" type="text" name="lName" required/>
  </fieldset>
  <fieldset>
    <input placeholder="Enter email" type="email" name="email" required/>
    <input placeholder="Contact Number" type="text" maxlength="15" name="contactNo" required/>
  </fieldset>
  <fieldset>
    <label class="text-gray-700" for="name">
    <textarea class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter your address" name="address" rows="5" cols="40">
    </textarea>
    </label>
  
    <div class=" relative ">
    <label for="required-email" class="text-gray-700">
        Email
        <span class="text-red-500 required-dot">
            *
        </span>
    </label>
    <input type="text" id="required-email" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="city" placeholder="city"/>
    </div>

    <input placeholder="City" type="text" name="city" required/>
    <input placeholder="Province" type="text" name="province" required/>
    <input placeholder="Zip Code" type="text" name="zipCode" maxlength="10" required/>
  </fieldset>
  
</Form>

<button on:click={() => console.log(values) }>
	Check 'dat two-way binding!
</button>

{#await $personalInfo}
    <Stretch size="60" color="#FF3E00" unit="px" duration="1s"></Stretch>
{:then personalInfo} 
    {#each personalInfo as pi}
        <img src={pi.photoURL} alt="user picture" height="100" width="100"> <br>
        {pi.userId} <br>
        {pi.fName} <br>
        {pi.mName} <br>
        {pi.lName} <br>
        {pi.email} <br>
        {pi.contactNo} <br>
        {pi.city} <br>
        {pi.birthDate} <br>
        {pi.address} <br>
        {pi.province} <br>
        {pi.zipCode} <br>
    {/each}
{:catch}
    ERROR
{/await}



                      