import { Response } from "@/core/types";
import axios from "axios";
import { baseAdminUrl } from ".";

export default async function updateGarageStatus(
    garageId: string | undefined,
    status: number | undefined,
): Promise<Response> {
    try {
        const result = await axios.put<Response>(
            `${baseAdminUrl}/garage/update-status`,
            { garageId: garageId, status: status },
        );

        return result.data;
    } catch (_error) {
        throw new Error(JSON.stringify(_error));
    }
}
