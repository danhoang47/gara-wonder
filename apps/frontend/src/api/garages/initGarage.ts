import axios from 'axios'

import { baseUrl } from '.'
import { Response } from '@/core/types';

export default async function initGarage(): Promise<Response> {
    try {
        const result = await axios.post<Response>(baseUrl + "/initGarage")
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}