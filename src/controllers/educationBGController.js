import axios from 'axios';

// FETCHING DATA WITH CACHE
const URL = `http://resumeGenerator.test/api/educationBG`;
const baseURL = `http://resumeGenerator.test/api`;


export async function getAllEducationBGByUserId(userId) {
    try {
        const response = await axios.get(`${baseURL}/educationBGs/${userId}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function getOneEducationBG(userId) {
    try {
        const response = await axios.get(`${URL}/${userId}`);
        return response.data[0];
    } catch (error){
        console.error(error);
    }
};

export async function addEducationBG(body){
    try {
        const response = await axios.post(URL, body);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function updateEducationBG(body){
    try {
        const response = await axios.put(URL, body);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function deleteEducationBG(EBGId){
    try {
        const response = await axios.delete(`${URL}/${EBGId}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
};