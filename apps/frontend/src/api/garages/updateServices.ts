import { Response, Service } from "@/core/types";
import axios from "axios";
import { baseGaragesUrl } from ".";

export default async function updateService(
    garageId: string | undefined,
    serviceId: string | undefined,
    updateService: Partial<Service>,
): Promise<Response> {
    try {
        const result = await axios.put<Response>(
            `${baseGaragesUrl}/${garageId}/management/services/${serviceId}`,
            updateService,
        );

        return result.data;
    } catch (_error) {
        throw new Error(JSON.stringify(_error));
    }
}
