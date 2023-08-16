import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://5fc9346b2af77700165ae514.mockapi.io',
  timeout: 10000, 
});

const api = {
  getProducts: () => instance.get('/products'),
};

export default api;
