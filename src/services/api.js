import axios from "axios";

const api = axios.create({
    baseURL: 'https://6284746f3060bbd34739082a.mockapi.io/',
});

export default api;