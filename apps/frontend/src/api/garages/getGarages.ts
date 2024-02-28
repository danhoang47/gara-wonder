import axios from "axios";

import { baseGaragesUrl } from '.' 
import { Garage, GarageFilter, GarageQueryParams, Paging, Response, User } from "@/core/types";

export type WithOwnerGarage = Omit<Garage, "userId"> & {
    owner: User,
    isFavorited: boolean
}

export default async function getGarages(
    queryParams?: GarageQueryParams
): Promise<Response<WithOwnerGarage[]>> {
    const authHeader = queryParams?.token ? { "Authorization": `Bearer ${queryParams.token}` } : {}
    const cloned = { ...queryParams }

    delete cloned.token

    console.log(cloned)
    try {   
        const result = await axios.get<Response<WithOwnerGarage[]>>(baseGaragesUrl, {
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
            params: cloned
        }) 

        return result.data
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}