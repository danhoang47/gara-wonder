import { Response, Service } from "@/core/types";
import axios from "axios";
import { baseGaragesUrl } from ".";

export default async function updateService(
    garageId: string | undefined,
    newService: Partial<Service>,
): Promise<Response> {
    try {
        delete newService["_id"];
        const result = await axios.post<Response>(
            `${baseGaragesUrl}/${garageId}/management/services/`,
            newService,
        );

        return result.data;
    } catch (_error) {
        throw new Error(JSON.stringify(_error));
    }
}
