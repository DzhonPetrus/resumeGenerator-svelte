import { writable } from 'svelte/store';
import axios from "axios";

const cachePersonalInfo = new Map();
export let personalInfoId = writable();
export let currentPersonalInfo = writable();

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

        if (!(data[0]===undefined))
            currentPersonalInfo.set(data[0]);

        cachePersonalInfo.set(url, data);
        personalInfo.set(Promise.resolve(data));
    }

    load();

    return personalInfo;
}

export function postPersonalInfo(info){
    console.log(info);
    axios.post(apiUrl, info)
    .then(response => console.log(response))
    .catch(err => console.error(err));
}