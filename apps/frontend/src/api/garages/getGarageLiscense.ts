import axios from "axios";
import { baseGaragesUrl } from ".";
import { Response } from "@/core/types";

export type GarageLiscense = {
    _id?: string;
    url?: string;
};
export default async function getGarageLiscense(
    garageId: string, // server/:garageId
) {
    try {
        // /garage/server/:garageId
        const result = await axios.get<
            Response<{ license: GarageLiscense[] }>
        >(`${baseGaragesUrl}/${garageId}/management/license`);

        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
