import axios, { AxiosError, HttpStatusCode } from 'axios'

import { baseUsersUrl } from '.'
import { Response, User } from '@/core/types'
import { auth } from '@/components/firebase'

export default async function getUser(id: string): Promise<Response<User>> {
    try {
        const result = await axios.get<Response<User>>(baseUsersUrl + `/${id}`)
        return result.data
    } catch (_error) {
        const error = _error as AxiosError;
        const user = auth.currentUser;
        const { response } = error;

        if (response?.status !== HttpStatusCode.NotFound || !user) {
            return Promise.reject(error);
        }
        
        const result = await axios.post<Response<User>>(baseUsersUrl + "/signUp", user)
        return result.data
    }
}