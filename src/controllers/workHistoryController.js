import axios from 'axios';

// FETCHING DATA WITH CACHE
const URL = `http://resumeGenerator.test/api/workHistory`;
const baseURL = `http://resumeGenerator.test/api`;


export async function getAllWorkHistoryByUserId(userId) {
    try {
        const response = await axios.get(`${baseURL}/workHistories/${userId}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function getOneWorkHistory(userId) {
    try {
        const response = await axios.get(`${URL}/${userId}`);
        return response.data[0];
    } catch (error){
        console.error(error);
    }
};

export async function addWorkHistory(body){
    try {
        const response = await axios.post(URL, body);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function updateWorkHistory(body){
    try {
        const response = await axios.put(URL, body);
        return response.data;
    } catch (error){
        console.error(error);
    }
};

export async function deleteWorkHistory(WHId){
    try {
        const response = await axios.delete(`${URL}/${WHId}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
};