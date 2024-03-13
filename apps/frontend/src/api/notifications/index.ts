import axios from 'axios'

export const notificationsInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/notification`
})

export { default as getNotifications } from './getNotifications'