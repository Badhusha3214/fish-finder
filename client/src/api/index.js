
import axios from 'axios';


export const getSingleItem = async (id) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/items/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getInitialSuggestions = async (category, query) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/search?category=${category}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getSearchSuggestions = async (category, query) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/search?category=${category}&query=${query}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getGSearchSuggestions = async ( query) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/search?query=${query}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const sendSuggession = async (feedback) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/suggestions`, feedback);
        console.log(res)
        return res.data;
    } catch (error) {
        console.log(error);
    }

};

export const sendContact = async (contact) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/messages`, contact);
        console.log(res)
        return res.data;
    } catch (error) {
        console.log(error);
    }

};