import axios from 'axios';

// FETCHING DATA WITH CACHE
const URL = `http://resumeGenerator.test/api/characterRef`;
const baseURL = `http://resumeGenerator.test/api`;


export async function getAllCharacterRefByUserId(userId) {
    try {
        const response = await axios.get(`${baseURL}/characterRefs/${userId}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function getOneCharacterRef(userId) {
    try {
        const response = await axios.get(`${URL}/${userId}`);
        return response.data[0];
    } catch (error){
        console.error(error);
    }
};

export async function addCharacterRef(body){
    try {
        const response = await axios.post(URL, body);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function updateCharacterRef(body){
    try {
        const response = await axios.put(URL, body);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function deleteCharacterRef(CharRefId){
    try {
        const response = await axios.delete(`${URL}/${CharRefId}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
};