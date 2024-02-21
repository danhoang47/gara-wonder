import axios from 'axios'

import { baseGaragesUrl } from '.'
import { Response } from '@/core/types';

export default async function initGarage(): Promise<Response> {
    try {
        const result = await axios.post<Response>(baseGaragesUrl + "/initGarage")
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}