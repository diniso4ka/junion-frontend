import axios from 'axios'
import { USER_LOCALSTORAGE_TOKEN } from '../config/consts/localStorage'

const api = axios.create({
    baseURL: 'https://junion-tech-server.onrender.com/',
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        USER_LOCALSTORAGE_TOKEN
    )}`
    return config
})

export default api
