import axios from 'axios'
import { User as FirebaseUser } from 'firebase/auth'

import { baseUsersUrl } from '.'
import { Response, User } from '@/core/types'

export default async function signup(user: FirebaseUser): Promise<Response<User>> {
    try {
        const result = await axios.post<Response<User>>(baseUsersUrl, user)
        return result.data
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}