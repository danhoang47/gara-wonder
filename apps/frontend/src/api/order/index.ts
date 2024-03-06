import axios from 'axios'

export const orderInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/order`
})

export { default as createOrders } from './createOrders'