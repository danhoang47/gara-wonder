import { Response } from "@/core/types";
import axios from "axios";
import { baseGaragesUrl } from ".";

export default async function addGarageToFavorites(garageId: string, token: string): Promise<Response> {
    try {
        const result = await axios.put<Response>(`${baseGaragesUrl}/favorite`, {
            garageId
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return result.data
    } catch(_error) {
        throw new Error(JSON.stringify(_error))
    }
}