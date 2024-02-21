import axios, { AxiosError, HttpStatusCode } from 'axios'

import { baseUsersUrl } from '.'
import { Response, User } from '@/core/types'

export default async function getUser(id: string): Promise<Response<User>> {
    try {
        const result = await axios.get<Response<User>>(baseUsersUrl + `/${id}`)
        return result.data
    } catch (error) {
        if (error instanceof AxiosError) {
            const statusCode = error.response?.status

            if (statusCode === HttpStatusCode.NotFound) {
                throw new Error(String(HttpStatusCode.NotFound))
            }
        }

        throw new Error(JSON.stringify(error))
    }
}