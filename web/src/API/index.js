
import axios from 'axios';




// User Signup / Registration
export const userRegister = async (user) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/auth/register`, user);
        return res.data;
    } catch (error) {
        console.log(error);
    }

};

// User Login
export const  userLogin = async (user) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/auth/login`, user);
        return res.data;
    } catch (error) {
        console.log(error);
        console.log(error.response.status);
        return error;   
    }

};


// Get All suggestions


// export const getsuggestions = async (suggestions) => {

//     try {
//         const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/v1/suggestions`, suggestions);
//         return res.data;
//     } catch (error) {
//         console.log(error);
//         console.log(error.response.status);
//         return error;   
//     }

// };

//get suggestions

export const getsuggestions = async (suggestions) => {
    try {
      // Retrieve cookies and find the token
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
  
      // Extract the token value from the cookie
      const token = tokenCookie.split('=')[1].trim();
  
      // Ensure the token is not empty
      if (!token) {
        throw new Error('Token is empty');
      }
  
      // Make the API call with the token in headers
      const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/suggestions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: suggestions // Use params to pass suggestions as query parameters
      });
  
    //   console.log(res);
      return res;
    } catch (error) {
      console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
      return error;
    }
  };
  export const marksuggestions = async (suggestionId) => {
    try {
      // Retrieve cookies and find the token
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
      if (!tokenCookie) {
        throw new Error('session timeout try login again');
      }
  
      // Extract the token value from the cookie
      const token = tokenCookie.split('=')[1].trim();
  
      // Ensure the token is not empty
      if (!token) {
        throw new Error('session timeout try login again');
      }
      const id =suggestionId.suggestionId;
      console.log(suggestionId.status);
      const status = suggestionId.status      
  
      // Make the API call with the token in headers
      const res = await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/suggestions/${id}`, {status} , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(res);
      return res;
    } catch (error) {
      console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
      return error;
    }
  };
export const deletesuggestions = async (suggestionId) => {
  try {
    // Retrieve cookies and find the token
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));

    if (!tokenCookie) {
      throw new Error('No token found in cookie');
    }

    // Extract the token value from the cookie
    const token = tokenCookie.split('=')[1].trim();

    // Ensure the token is not empty
    if (!token) {
      throw new Error('Token is empty');
    }
    console.log(suggestionId.suggestionId);
    const id =suggestionId.suggestionId;
    // Make the API call with the token in headers
    const res = await axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/suggestions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res);
    return res;
  } catch (error) {
    console.error('Error deleting suggestion:', error.response ? error.response.data : error.message);
    return error;
  }
};

// get items


  export const getitem = async () => {
    try {
      // Retrieve cookies and find the token
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
  
      // Extract the token value from the cookie
      const token = tokenCookie.split('=')[1].trim();
  
      // Ensure the token is not empty
      if (!token) {
        throw new Error('Token is empty');
      }
  
      // Make the API call with the token in headers
      const res = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
  
    //   console.log(res);
      return res;
    } catch (error) {
      console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
      return error;
    }
  };


  // delete item (not done)
  export const deleteitem = async (itemid) => {
    try {
      // Retrieve cookies and find the token
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
  
      // Extract the token value from the cookie
      const token = tokenCookie.split('=')[1].trim();
  
      // Ensure the token is not empty
      if (!token) {
        throw new Error('Token is empty');
      }
  
      // Make the API call with the token in headers
      const res = await axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/items/${itemid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
  
    //   console.log(res);
      return res;
    } catch (error) {
      console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
      return error;
    }
  };
  export const edititem = async (itemid , item) => {
    try {
      // Retrieve cookies and find the token
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
  
      // Extract the token value from the cookie
      const token = tokenCookie.split('=')[1].trim();
  
      // Ensure the token is not empty
      if (!token) {
        throw new Error('Token is empty');
      }
  
      // Make the API call with the token in headers
      const res = await axios.patch(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/items/${itemid}`, {item}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
  
    //   console.log(res);
      return res;
    } catch (error) {
      console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
      return error;
    }
  };


  // add item
    
  export const additem = async (item) => {
    try {
      // Retrieve cookies and find the token
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
      if (!tokenCookie) {
        throw new Error('No token found in cookie');
      }
  
      // Extract the token value from the cookie
      const token = tokenCookie.split('=')[1].trim();
  
      // Ensure the token is not empty
      if (!token) {
        throw new Error('Token is empty');
      }
  
      // Make the API call with the token in headers
      const res = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/items` ,item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
  
    //   console.log(res);
      return res;
    } catch (error) {
      console.error('Error fetching suggestions:', error.response ? error.response.data : error.message);
      return error;
    }
  };
