import axios, { AxiosError } from "axios";

import { Response } from "@/core/types";
import { baseGaragesUrl } from ".";

export default async function getOrderEvaluation(id: string | undefined) {
    try {
        const result = await axios.get<Response>(
            baseGaragesUrl + `/evaluation/${id}`,
        );
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
