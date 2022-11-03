import axios from 'axios'

const api = axios.create({
    baseURL: 'https://junion-tech-backend.herokuapp.com',
})

api.interceptors.request.use(config => {
    //@ts-ignore
    config.headers.Authorization = `Bearer ${JSON.parse(
        //@ts-ignore
        localStorage.getItem('token')
    )}`
    return config
})

export default api
