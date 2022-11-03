import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://junion-tech-backend.herokuapp.com',
})
