import axios from 'axios';
import interceptors from '@/plugins/axios/interceptors';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
interceptors(instance);

export default instance;