<script>
    import Form from '@svelteschool/svelte-forms';
    import { Stretch } from 'svelte-loading-spinners';
    import { getPersonalInfo, personalInfoId } from '../stores/personalInfoStore';


    const apiUrl = `http://resumeGenerator.test/api/personalInfo`;

    $: personalInfo = getPersonalInfo(`${apiUrl}/${$personalInfoId}`);

    let values;
</script>

<h1>PERSONAL INFO</h1>


<Form bind:values>
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
    <textarea placeholder="Address" name="address" required/>
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
        {console.log(pi)} <br>
    {/each}
{:catch}
    ERROR
{/await}