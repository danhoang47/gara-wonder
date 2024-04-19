import { Response } from "@/core/types";
import axios from "axios";
import { baseGaragesUrl } from ".";

export default async function updateService(
    garageId: string | undefined,
    front?: File,
    back?: File,
): Promise<Response> {
    try {
        const form = new FormData();
        if (front) form.append("frontLicense", front);
        if (back) form.append("backLicense", back);

        const result = await axios.post<Response>(
            `${baseGaragesUrl}/${garageId}/management/license`,
            form,
        );

        return result.data;
    } catch (_error) {
        throw new Error(JSON.stringify(_error));
    }
}
