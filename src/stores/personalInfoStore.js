import {writable} from 'svelte/store';
export let personalInfoId = writable();

import axios from 'axios';

// FETCHING DATA WITH CACHE
const URL = `http://resumeGenerator.test/api/personalInfo`;


export async function getAllPersonalInfo() {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function getOnePersonalInfo(userId) {
    try {
        const response = await axios.get(`${URL}/${userId}`);
        return response.data[0];
    } catch (error){
        console.error(error);
    }
};

export async function addPersonalInfo(body){
    try {
        const response = await axios.post(URL, body);
        return response.data;
    } catch (error){
        console.error(err);
    }
};

export async function updatePersonalInfo(body){
    try {
        const response = await axios.put(URL, body);
        return response.data;
    } catch (error){
        console.error(err);
    }
};