import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openai.com/v1/models',  
});

export default api;