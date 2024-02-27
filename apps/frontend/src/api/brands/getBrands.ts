import axios from 'axios'

import { baseBrandsUrl } from '.'
import { Response,  Brand } from '@/core/types'

export default async function getBrands(): Promise<Brand[]> {
    try {
        const result = (await axios.get<Response<Brand[]>>(baseBrandsUrl)).data
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}

