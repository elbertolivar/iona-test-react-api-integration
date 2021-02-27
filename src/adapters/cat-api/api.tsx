import axios from "axios";

// Destructure the env variables to be consumed
const { 
    REACT_APP_CAT_API_URL,
    REACT_APP_CAT_API_KEY,
} = process.env;

// Make APi request from the Cat API
export const makeCatAPIRequest = async (path: string) => {
    return await axios.get(`${REACT_APP_CAT_API_URL}${path}`,{  
        headers: { 
            'x-api-key': `${REACT_APP_CAT_API_KEY}` 
        }
    });
};



