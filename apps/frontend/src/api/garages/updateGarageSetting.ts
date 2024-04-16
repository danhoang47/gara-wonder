import { Response } from "@/core/types";
import axios from "axios";
import { baseGaragesUrl } from ".";

export default async function updateGarageSetting(
    api: string,
    body?: { policy?: string },
): Promise<Response> {
    try {
        const result = await axios.post<Response>(
            `${baseGaragesUrl}/${api}`,
            body,
        );

        return result.data;
    } catch (_error) {
        throw new Error(JSON.stringify(_error));
    }
}
