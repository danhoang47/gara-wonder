import { GarageFilter, Paging } from "@/core/types";
import axios from "axios";

export default async function getGarages(
    category?: string,
    filter?: GarageFilter,
    sort?: string,
    paging?: Paging,
    latlng?: [number, number]
) {
    try {   
        
    } catch (error) {
        throw new Error(JSON.stringify(error))
    }
}