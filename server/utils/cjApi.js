import axios from 'axios';
import { loadCjToken } from '../controllers/authController.js';

const createCjApiInstance = async () => {
  const token = await loadCjToken();

  return axios.create({
    baseURL: 'https://developers.cjdropshipping.com/api2.0/v1',
    headers: {
      'CJ-Access-Token': token,
    },
  });
};

export default createCjApiInstance;
