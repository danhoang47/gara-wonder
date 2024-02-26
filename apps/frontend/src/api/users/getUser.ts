import axios, { AxiosError } from 'axios'

import { baseUsersUrl } from '.'
import { Response, User } from '@/core/types'

export default async function getUser(id: string): Promise<Response<User>> {
    try {
        const result = await axios.get<Response<User>>(baseUsersUrl + `/${id}`)
        return result.data
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data))
    }
}