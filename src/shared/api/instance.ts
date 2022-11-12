import axios from 'axios'

const api = axios.create({
    baseURL: 'https://junion-tech-backend.herokuapp.com',
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${
        localStorage.getItem('token')
            ? JSON.parse(localStorage.getItem('token'))
            : ''
    }`
    return config
})

export default api
