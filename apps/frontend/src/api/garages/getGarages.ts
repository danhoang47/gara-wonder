import axios from "axios";

import { baseGaragesUrl } from '.' 
import { Garage, GarageFilter, Paging, Response } from "@/core/types";

export default async function getGarages(
    category?: string | null,
    filter?: GarageFilter,
    sort?: string | null,
    paging?: Paging,
    lat?: string | null,
    lng?: string | null
): Promise<Response<Garage[]>> {
    try {   
        const result = await axios.get<Response<Garage[]>>(baseGaragesUrl, {
            params: {
                ...filter,
                category,
                sort,
                ...paging,
                lat: lat,
                lng: lng,
            },
            headers: {
                "Content-Type": "application/json"
            }
        }) 

        return result.data
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}