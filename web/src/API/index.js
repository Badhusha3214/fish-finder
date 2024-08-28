
import axios from 'axios';




// User Signup / Registration
export const userRegister = async (user) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_INOVUS_API_BASE_URL}/auth/register`, user);
        return res.data;
    } catch (error) {
        console.log(error);
    }

};

// User Login
export const userLogin = async (user) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_INOVUS_API_BASE_URL}/auth/login`, user);
        return res.data;
    } catch (error) {
        console.log(error);
        console.log(error.response.status);
        return error;   
    }

};