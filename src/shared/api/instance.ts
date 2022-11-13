import axios from 'axios'
import { TOKEN_KEY } from '../config/config/consts'

const api = axios.create({
    baseURL: 'https://junion-tech-backend.herokuapp.com',
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    return config
})

export default api
