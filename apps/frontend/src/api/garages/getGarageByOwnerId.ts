import { Garage, Response } from "@/core/types"
import axios from "axios"

export default async function getGarageByOwnerId(ownerId: string): Promise<Response<Garage>> {
    try {
        const result = await axios<Response<Garage>>(`${import.meta.env.VITE_API_URL}/garageManagement/owner/${ownerId}`)
        return result.data
    } catch (err) {
        throw new Error(JSON.stringify(err))
    }
}