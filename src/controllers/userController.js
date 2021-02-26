import axios from 'axios';

// FETCHING DATA WITH CACHE
const URL = `http://resumeGenerator.test/api/user`;
const baseURL = `http://resumeGenerator.test/api`;


export async function getOneUserByUsername(username) {
    try {
        const response = await axios.get(`${baseURL}/username/${username}`);
        return response.data[0];
    } catch (error){
        console.error(error);
    }
};

export async function loginUser(body){
    try {
        const response = await axios.post(`${URL}/login`, body);
        return response.data;
    } catch (error){
        console.error(err);
    }
};

export async function registerUser(body){
    try {
        const response = await axios.post(`${URL}/register`, body);
        return response.data;
    } catch (error){
        console.error(err);
    }
};