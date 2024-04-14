import { Response } from "@/core/types";
import axios from "axios";
import { baseGaragesUrl } from ".";

export default async function deleteService(
    garageId: string | undefined,
    serviceId: string | undefined,
): Promise<Response> {
    try {
        const result = await axios.delete<Response>(
            `${baseGaragesUrl}/${garageId}/management/services/${serviceId}`,
        );

        return result.data;
    } catch (_error) {
        throw new Error(JSON.stringify(_error));
    }
}
