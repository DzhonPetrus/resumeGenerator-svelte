import { writable } from 'svelte/store';

const cachePersonalInfo = new Map();
export let personalInfoId = writable();

// FETCHING DATA WITH CACHE
const apiUrl = `http://resumeGenerator.test/api/personalInfo`;

export function getPersonalInfo(piId){

    let url = `${apiUrl}/${piId}`;
    const personalInfo = writable(new Promise(() => {}));

    if(cachePersonalInfo.has(url)){
        personalInfo.set(Promise.resolve(cachePersonalInfo.get(url)));
    }

    const load = async () => {
        const response = await fetch(url);
        const data = await response.json();

        cachePersonalInfo.set(url, data);
        personalInfo.set(Promise.resolve(data));
    }

    load();
    return personalInfo;
}