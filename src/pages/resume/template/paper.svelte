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
  <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,700' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
</svelte:head>
	
  <div id="resume">
  <div class="resume-wrapper">
    <article class="paper">
        <header>
          <div class="header-content">
            <div class="header-text">
              <p>
                {fullName}
              </p>
              <p class="subtitle">{PI.desiredPosition}</p>
            </div>
          </div>
        </header>
        <div class="content-wrapper">
          <!-- CONTACT -->
          <section class="content">
            <div class="row">
              <div class="content-cat">
                About
              </div>
              <div class="content-text">
                  <ul>
                    <li>Email</li>
                    <li>{PI.email}</li>
                  </ul>
                  <ul>
                    <li>Phone</li>
                    <li>{PI.contactNo}</li>
                  </ul>
                  <ul>
                    <li>BirthDate</li>
                    <li>{PI.birthDate}</li>
                  </ul>
              </div>
            </div>
          </section>
          <!-- LOCATION -->
              <section class="content">
                <div class="row">
                  <div class="content-cat">
                    Location
                  </div>
                  <div class="content-text">
                      <ul>
                        <li>Address</li>
                        <li>{PI.address}</li>
                      </ul>
                        <ul>
                          <li>Postal Code & City</li>
                          <li>{PI.zipCode}, {PI.city}</li>
                        </ul>
                      <ul>
                        <li>Region</li>
                        <li>{PI.province}</li>
                      </ul>
                  </div>
                </div>
              </section>
        
              {#if workHistory.length > 0}
                <section class="content">
                  <div class="row">
                    <div class="content-cat">
                        Work  Experience
                    </div>
                    <div class="content-text work-listing education-listing">
                    {#each workHistory as WH}
                        <p style="margin-top:2.4em;">
                            {WH.startDate} — {(WH.endDate === null) ? 'Current' : WH.endDate}
                        </p>
                        <p>
                          <strong>{WH.jobTitle}</strong>
                          at <strong>{WH.employer}</strong>
                        </p>
                        <p>{WH.jobDescription}</p>
                    {/each}
                    </div>
                  </div>
                </section>
                {/if}


                {#if educationBG.length > 0}
                <section class="content">
                  <div class="row">
                    <div class="content-cat">
                        Education
                    </div>
                    <div class="content-text work-listing education-listing">
                    {#each educationBG as EBG}
                            <p>{EBG.startDate} — {(EBG.endDate === null) ? 'Current' : EBG.endDate}</p>
                          <p class="heading" >{EBG.institution}</p>
                        <p class="highlight">
                            {(EBG.studyType === 'Tertiary') ? EBG.course : EBG.studyType}
                        </p>
                        <p class="highlight">{EBG.location}</p>
                        <br />
                    {/each}
                    </div>
                  </div>
                </section>
                {/if}

              <!-- <section class="content">
                <div class="row">
                  <div class="content-cat big-text">
                      Awards
                      <p>Digital Compression Pioneer Award</p>
                      <p style="margin-top:0.25em;">2014-11-01</p>
                  </div>
                  <div class="content-text work-listing">
                      <strong><p class="heading">Techcrunch</p></strong>
                      <p class="highlight">There is no spoon.</p>
                  </div>
                </div>
              </section> -->


        {#if characterRef.length > 0}
        <section class="content">
            <div class="row">
              <div class="content-cat">
                Character Reference
              </div>
              <div class="content-text skills-listing">
              {#each characterRef as charRef}
                  <p>
                    <span class="name">
                        <strong>
                            {charRef.name}
                        </strong>
                    </span>
                  </p>
                  <p>
                    <span class="name">
                            {charRef.jobTitle}
                    </span>
                  </p>
                  <p>
                    <span class="name">
                            {charRef.email}
                            <br/> {charRef.contactNo}
                    </span>
                  </p>
                  <br/>
              {/each}
              </div>
            </div>
          </section>
        {/if}


          <!-- <section class="content">
            <div class="row">
              <div class="content-cat">
                Skills
              </div>
              <div class="content-text skills-listing">
                  <p>
                    <span class="name">
                        <strong>
                          Web Development
                        </strong>
                    </span>
                      <span>(Master):</span>
                      HTML, CSS, Javascript
                  </p>
                  <p>
                    <span class="name">
                        <strong>
                          Compression
                        </strong>
                    </span>
                      <span>(Master):</span>
                      Mpeg, MP4, GIF
                  </p>
              </div>
            </div>
          </section> -->


        </div>
    </article>
  </div>
  </div>






  <style>
  body, html {
  padding-top:2.5em;
  margin:0;
  background-color:#fafafa;
}

.note {
  display:block;
  position: absolute;
  top:10px;
  left:10px;

  font-family: "Open Sans";
  font-size: 0.6em;
}

.new {
  background-color: #81C784;

  border: 1px solid #757575;
  padding: 1px;
  border-radius: 4px;

}

/* Header */

header {
  width:100%;
  vertical-align: middle;
  text-align: center;
 
}

.header-content {
  display: inline-block;
}

.pic {
  margin: 0 auto;
  margin-top:-2.5em;
  
  border-radius:10em;
  height:4em;
  width:4em;
  
  border: 2px solid #e0e0e0;
  transition : all 0.5s linear;
  
}

@-webkit-keyframes wiggle {
  0%   {
    transform: rotate(0deg);
  }
  25%  {
    transform: rotate(-30deg);
  }
  50%  {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.pic:hover {
  /*Webkit fix*/
  -webkit-transform: translateZ(0);
  
  cursor:pointer;
  
  -webkit-animation: wiggle 0.7s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.header-text {
  margin-top:0.5em;
  margin-left:1em;
}

header p {
  text-align:center;
  font-family: "Merriweather";
  
  margin:0;
  
  color: #212121;
}

.first-name {
   font-size: 1.05em;
}

.subtitle {
  font-family: "Merriweather";
  padding-top:.3em;
  font-size:0.55em;
  font-weight:500;
  color: #424242;
}

/* Information */

.paper {
  margin: 0 auto;
  margin-bottom:1em;
  
  background-color:white;
  width:60%;
  
  padding:0.5em 0 0.5em 0;
  
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 3px solid #e0e0e0;
  border-radius:3px;
}

@media(max-width:992px) {
  .paper {
    width:80%;
  }
}

/* Content Part */

.content-wrapper {
  padding-right:7.25%;
}

.content {
  display:table;
  width:100%;
  
  padding-top:1.5em;
  
  /*border-top: 1px solid #eeeeee;*/
}

.content:last-child {
  margin-bottom: 2em;
}

body > div > article > div > section:last-child {
  padding-bottom:1.5em;
}

.row {
    display:table-row;
}
.row div {
    display:table-cell;
}

.content-cat {
  font-family: "Merriweather";
  font-variant:small-caps;
  font-weight:300;
  letter-spacing: 1px;
  
  color: #212121;
  
  font-size:0.975em;
  
  text-align:center;
  vertical-align:middle;

  padding-left:6.66%;
  width:30%;
}

.content-cat p {
  font-size:0.55em;
  font-weight:600;
  
  margin-bottom:0;
}

.content-text {
  border-left:1px solid #e0e0e0;
  transition: border 0.66s ease-in;
}

.big-text {
  vertical-align:top;
}

.content-text ul {
  padding:0;
  margin:0;
  margin-top:0.15em;
  
  width:85%;
  margin-left:1.5em;
}

.content-text ul:last-child {
  margin-bottom:0.5em;
}

.content-text ul li {
  font-family: "Open Sans";
  font-size:0.7em;
  
  display:inline-block;
  
}

.content-text ul li:first-child {
  width:35%;
  
  color: #424242;
  
  font-weight:600;
}

.content-text ul li a, div.content-text.work-listing.education-listing > p > strong > a {
  text-decoration: none;
  color: #0277bd;
}

.content-text ul li a:hover {
  color:#4fc3f7;
}

.work-listing p {
  font-family: "Open Sans";
  font-size:0.7em;
  
  color: #424242;
  
  margin-left:2em;
  margin-top:0.45em;
  margin-bottom: 0.45em;
}

div.content-text.work-listing.education-listing > p:nth-child(2) {
  margin-top:0.25em;
}

.work-listing .highlight {
  font-family: "Open Sans";
  font-size:0.7em;
  font-weight:400;
  
  color: #424242;
  
  margin-left:3.25em;
  padding-left:0.5em;
  
  border-left:1px solid #e0e0e0;
  
}

.education-listing > .heading {
  font-weight:600;
  
  margin-top:0.75em;
  margin-left:2em;
}

.education-listing > .highlight {
  margin-left:3.25em;
}

.highlight {
  transition: border .33s ease-in;
}

.profiles-listing ul li, .profiles-listing ul li:first-child {
  width:32%;
  font-weight: normal;
}

.work-content, .education-content {
  padding-top: .75em;
}

section.content.education-content > div > div.content-cat {
  vertical-align: top;
}

div.content-text.skills-listing > p {
  font-family: "Open Sans";
  font-size:0.7em;
  font-weight:400;

  margin-left: 2em;
  margin-top: 0.45em;
  margin-bottom: 0.45em;
}

div.content-text.skills-listing > p > {
  color:#212121;
}

@media screen and (max-width: 600px) {
  body, html {
    padding-top: 30px;
  }

  .paper {
    width:95%;
  }

  .row div {
    display: block;
  }

  .content-cat {
    width: 100%;
  }

  .content-text ul li {
    width: 100%;
  }

  .content-text ul li:first-child {
    width: 100%;
  }
  
  .education-listing > .highlight {
    margin-left: 30px;
  }
}
  @media print {

body, html {
  background-color: white;
  padding-top: 1.5em;
}

.paper {
  width:100%;
  border: 0;

  padding-top: 0;
}

header p {
  font-size: 1.3em;
}

.subtitle {
  font-size: 0.7em;
}

.header-pic {
  float:left;
}

.profiles {
  display:none;
}

.content {
  page-break-inside:avoid; 
  page-break-after:auto;
}

.header-text {
  float:left;
  margin-top: -1.6em;
}

.content-wrapper > .content:first-child {
  padding-top: 2em;
}

.content:last-child {
  padding-bottom: 0;
}

.content-cat {
  width:33%;
  color:black;
  text-align: left;
}

.content-cat p {
  font-size:0.6em;
  font-weight: 600;
}

header p, .content-text, .work-listing p, .content-text ul li:first-child, .work-listing .highlight, .content-text.skills-listing > ul > li > .highlight {
  color:black;
}

.content-text.skills-listing > ul > li span, .subtitle {
  color:#212121;
}

.content-text ul:last-child {
  margin-bottom: 0.25em;
}

.content-text ul li:first-child {
  width:50%;
}

.profiles-listing ul li:first-child {
  width:32%;
}

div.content-text.skills-listing > ul > li {
  width:33%;
}

.work-listing p {
  margin-bottom: 0.1em;
}

div.content-text.skills-listing > ul > li > p {
  margin-top: 0.4em;
  margin-bottom: 0.5em;
}

div.content-text.skills-listing > ul > li {
  padding-left: 1.5em;
}

div.content-text.skills-listing > ul > li:first-child {
  padding-left: 2em;
}

.note {
  display:none;
}

.content-text:hover {
  border-left:1px solid #eeeeee;
}

.content-text ul li a:hover {
  color:#4fc3f7;
}

.highlight:hover, .content-text.skills-listing > ul > li > .highlight:hover {
  border-left:1px solid #eeeeee;
}

.big-text {
  padding-top: 0;
}

  }</style>