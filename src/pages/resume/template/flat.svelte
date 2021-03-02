<script>
    import {currentUser, currentUserPersonalInfo, currentUserWorkHistory, currentUserEBG, currentUserCharacterRef} from '../../../util/store.js';


    $: workHistory = $currentUserWorkHistory;
    $: characterRef = $currentUserCharacterRef;
    $: educationBG = $currentUserEBG;
    $: PI = $currentUserPersonalInfo;
    

    $:fullName = `${PI.fName} ${PI.mName !== null ? PI.mName : ''} ${PI.lName} `;
    $:fullAddress = `${PI.address}, ${PI.city}, ${PI.province}, ${PI.zipCode}`;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/2.0.2/octicons.min.css">
</svelte:head>
	
	

<div id="resume">
<header id="header">
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-sm-push-3">
                <h1>{fullName}</h1>
                <h2>
                    {PI.desiredPosition}
                </h2>
            </div>
        </div>
    </div>
</header>
<div id="content" class="container">

<section id="contact" class="row">
    <aside class="col-sm-3">
        <h3>About</h3>
    </aside>
    <div class="col-sm-9">
        <div class="row">
            <div class="col-sm-6">
                <strong>Email</strong>
                <div class="email">{PI.email}</div>
            </div>
            <div class="col-sm-6">
                <strong>Phone</strong>
                <div class="phone">{PI.contactNo}</div>
            </div>

            <div class="col-sm-6">
                <strong>Address</strong>
                <div class="address">{fullAddress}</div>
            </div>
            <div class="col-sm-6">
                <strong>Birth Date</strong>
                <div class="phone">{PI.birthDate}</div>
            </div>
        </div>
    </div>
</section>


{#if workHistory.length > 0}
<section id="work" class="row">
    <aside class="col-sm-3">
        <h3>Work</h3>
    </aside>
    <div class="col-sm-9">
        {#each workHistory as WH}
        <div class="row">
        <div class="col-sm-12">
            <h4 class="strike-through">
                <span>{WH.employer}</span>
                <span class="date">
                    {WH.startDate} — {(WH.endDate === null) ? 'Current' : WH.endDate}
                </span>
            </h4>
           <div class="website pull-right">{WH.location}</div> <div class="position">
                {WH.jobTitle}
            </div>
            <div class="summary">
                <p>{WH.jobDescription}</p>
            </div>
        </div>
        </div>
        <br/> <br/>
        {/each}
    </div>
</section>
{/if}


{#if educationBG.length > 0}
<section id="education" class="row">
    <aside class="col-sm-3">
        <h3>Education</h3>
    </aside>
    <div class="col-sm-9">
        {#each educationBG as EBG}
        <div class="row">
        <div class="col-sm-12">
            <h4 class="strike-through">
                <span>{EBG.institution}</span>
                <span class="date">
                    {EBG.startDate} — {(EBG.endDate === null) ? 'Current' : EBG.endDate}
                </span>
            </h4>
            <div class="area">
                {(EBG.studyType === 'Tertiary') ? EBG.course : EBG.studyType}
            </div>
            <div class="studyType">{EBG.location}</div>
        </div>
        </div>
        <br/> <br/>
        {/each}
    </div>
</section>
{/if}


<!-- <section id="skills" class="row">
    <aside class="col-sm-3">
        <h3>Skills</h3>
    </aside>
    <div class="col-sm-9">
        <div class="row">
        <div class="col-sm-6">
            <div class="name">
                <h4>Web Development</h4>
            </div>
            <ul class="keywords">
                <li>HTML</li>
                <li>CSS</li>
                <li>Javascript</li>
            </ul>
        </div>
        <div class="col-sm-6">
            <div class="name">
                <h4>Compression</h4>
            </div>
            <ul class="keywords">
                <li>Mpeg</li>
                <li>MP4</li>
                <li>GIF</li>
            </ul>
        </div>
        </div>
    </div>
</section> -->


{#if characterRef.length > 0}
<section id="references" class="row">
    <aside class="col-sm-3">
        <h3>References</h3>
    </aside>
    <div class="col-sm-9">
        {#each characterRef as charRef}
        <div class="row">
        <div class="col-sm-12">
            <h4 class="strike-through">
                <span>{charRef.name}</span>
            </h4>
            <div class="position">
                {charRef.jobTitle}
            </div>
           <div class="position">
                {charRef.email}
            </div>
            <div class="position">
                {charRef.contactNo}
            </div>
        </div>
        </div>
        <br/> <br/>
        {/each}
    </div>
</section>
{/if}

</div>

</div>




<style type="text/css">
	@import url(
	https://fonts.googleapis.com/css?family=Lato:400,700
);
body {
	background: #fff;
	font-family: Lato, sans-serif;
	margin: 0 0 80px;
}
a {
	color: #2ecc71;
}
a:focus,
a:hover {
	color: #f1c40f;
	text-decoration: none;
}
p {
	line-height: 1.5;
	margin: 0;
}
p + p {
	margin-top: 10px;
}
h1,
h2,
h3,
h4 {
	margin-top: 0
}
section {
	margin-top: 30px;
}
li {
	line-height: 1.8;
	list-style: none;
}
li:before {
	content: "\f052";
	float: left;
	font: 13px Octicons;
	margin-top: 6px;
	margin-left: -20px;
	opacity: .1;
	position: absolute;
}
blockquote {
	border-left: 5px solid #e7e9ec;
	font-size: 14px;
}
em {
	color: #95a5a6;
	font-weight: normal;
	font-style: normal;
}
h4 span:first-child {
	color: #000;
	font-weight: bold;
}
.container {
	max-width: 750px;
	padding: 0 30px;
}
.col-sm-6 {
	margin-bottom: 10px;
}
.col-sm-12 h4 {
	margin-top: 12px; 
}
.col-sm-12 + .col-sm-12 {
	margin-top: 30px;
}
#header {
	background: #f4f6f6;
	padding: 50px 0;
	margin-bottom: 30px;
}
#header h2 {
	color: #95a5a6;
	font-size: 24px;
}
#content h3 {
	color: #f1c40f;
	font-size: 26px;
	margin-top: -4px;
}
#content aside {
	text-align: right;
	padding-right: 30px;
}
#profiles .network {
	text-transform: capitalize;
}
#work .position,
#volunteer .position {
	font-weight: bold;
	margin-bottom: 8px;
}
#education .area {
	font-weight: bold;
}
#education .area:before {
	content: "\f0d7";
	font: 16px Octicons;
	margin-right: 6px;
}
#education .studyType {
	margin-left: 25px;
}
#awards .summary,
#publications .summary {
	margin-top: 8px;
}
#publications .website a:before {
	content: attr(href);
}

@media (min-width: 480px) {
	.strike-through {
		border-top: 1px solid #f4f6f6;
		height: 20px;
		margin-top: 12px;
		margin-bottom: -2px;
		position: relative;
	}
	.strike-through span,
	.strike-through a {
		background: #fff;
		position: absolute;
	}
	.strike-through span:first-child {
		padding-right: 20px;
		margin-top: -12px;
	}
	.strike-through span + span {
		font-size: 14px;
		margin-top: -10px;
		padding-left: 20px;
		right: 0;
	}
}
@media (max-width: 768px) {
	.col-sm-6:last-child {
		margin-bottom: 0px;
	}
	#content aside {
		margin-bottom: 20px;
		padding-right: 0;
		text-align: left;
	}
	#publications .website a:before {
		content: "View publication";
	}
}
@media (max-width: 480px) {
	h1 {
		font-size: 26px;
	}
	.date {
		font-size: 14px;
		margin-bottom: 5px;
	}
	.strike-through span:first-child {
		margin-bottom: 7px;
	}
	.strike-through span {
		display: block;
	}	
	#header {
		margin-bottom: 10px;
		padding: 40px 0;
	}
	#actions {
		display: none;
	}
}

</style>