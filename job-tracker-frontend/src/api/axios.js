import axios from 'axios';

export default axios.create({
  baseURL: '/api', // so your requests go through vite proxy
});
