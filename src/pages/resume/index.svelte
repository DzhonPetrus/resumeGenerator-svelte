<script>
    import html2pdf from 'html2pdf.js';
    import CLASS from './template/class.svelte';
    const baseURL = `http://localhost:5000/resume/template/`;
    const templates = ['flat', 'CLASS', 'paper'];

    function handleClick(template){
        let element = document.getElementById(template);
        html2pdf(element);
    }
</script>

<!-- <svelte:head>
	<script src="https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js" on:load={initializeRemarkable}></script>
</svelte:head> -->



<div class="shadow overflow-hidden sm:rounded-md bg-white items-center">
{#each templates as url}
<div class="px-4 py-5 bg-white sm:p-6">
  <h1 class="text-gray-900 font-bold text-2xl justify-center items-center flex ">
    {url}
  </h1>
  <br/>
<iframe id={url} src={baseURL+url.toLowerCase()}
        width="100%" height="500" frameborder="0"
        allowfullscreen >
  <p>
    <a href={baseURL+url.toLowerCase()}>
       Fallback link for browsers that don't support iframes
    </a>
  </p>
</iframe>
  <br/>

<a href={baseURL+url.toLowerCase()} class="hover:text-gray-800 cursor-pointer text-gray-400 w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-center">
    View {url} in full page
</a>

</div>
<br/><br/><br/>
{/each}
</div>
