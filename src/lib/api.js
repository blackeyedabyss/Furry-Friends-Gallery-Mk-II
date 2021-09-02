import axios from 'axios';

const API_URL = process.env.REACT_APP_DOG_API_URL;
const API_KEY = process.env.REACT_APP_DOG_API_KEY;

const callAPI = async (url, params = null) => {
    const requestConfig = {
        baseURL: API_URL,
        headers: {
          'x-api-key': API_KEY
        },
        url
      };
    
      if (params) {
        requestConfig.params = params;
      }
      try {
        return await axios(requestConfig);
      } catch (err) {
        console.log('axios encountered an error', err);
      }
};