import { writable } from 'svelte/store';

const cachePersonalInfo = new Map();
export let personalInfoId = writable();

// FETCHING DATA WITH CACHE

export function getPersonalInfo(url){
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