<script>
    import html2pdf from 'html2pdf.js';
    import CLASS from './template/class.svelte';
    const baseURL = `http://localhost:5000/resume/template/`;
    const templates = ['flat', 'CLASS', 'paper'];

    function handleClick(template){
        let element = document.getElementById(template);
        console.log(template);
        console.log(element);
        html2pdf(element);
    }
</script>

<!-- <svelte:head>
	<script src="https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js" on:load={initializeRemarkable}></script>
</svelte:head> -->



<div class="shadow overflow-hidden sm:rounded-md bg-white">
{#each templates as url}
<div class="px-4 py-5 bg-white sm:p-6">
  <h1 class="text-gray-900 font-bold text-2xl">{url}</h1>
<iframe id={url} src={baseURL+url.toLowerCase()}
        width="100%" height="500" frameborder="0"
        allowfullscreen >
  <p>
    <a href={baseURL+url.toLowerCase()}>
       Fallback link for browsers that don't support iframes
    </a>
  </p>
</iframe>

<a href={baseURL+url.toLowerCase()}>
    View {url} in full page
</a>

</div>
<br/><br/><br/>
{/each}
</div>
