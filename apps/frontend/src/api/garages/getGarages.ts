import { baseGaragesUrl } from '.' 
import { Garage, GarageQueryParams, Response, User } from "@/core/types";

export type WithOwnerGarage = Omit<Garage, "userId"> & {
    owner: User,
    isFavorite: boolean,
    price: {
        from: number,
        to: number
    }
}

export default async function getGarages(
    queryParams?: GarageQueryParams
): Promise<Response<WithOwnerGarage[]>> {
    const authHeader: HeadersInit = queryParams?.token ? { "Authorization": `Bearer ${queryParams.token}` } : {}
    const cloned = { ...queryParams }

    delete cloned.token

    try {   
        const result = await fetch(baseGaragesUrl + "/home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
            body: JSON.stringify(cloned)
        }) 

        return await result.json() as Response<WithOwnerGarage[]>
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}