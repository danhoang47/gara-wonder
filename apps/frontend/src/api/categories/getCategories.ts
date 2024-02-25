import axios from 'axios'

import { baseCategoriesUrl } from '.'
import { Response, Category } from '@/core/types'

export default async function getCategories(): Promise<Category[]> {
    try {
        const result = (await axios.get<Response<Category[]>>(baseCategoriesUrl)).data
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}