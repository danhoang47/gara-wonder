import axios, { AxiosError } from "axios";

import { Response } from "@/core/types";
import { baseGaragesUrl } from ".";

export default async function getScheduleSlot(
    id: string | undefined,
    month: number | string,
    year: number | string,
) {
    try {
        let fetchUrl = baseGaragesUrl + `/${id}/management/schedule?`;
        if (month) fetchUrl = fetchUrl + `month=${month}&`;
        if (year) fetchUrl = fetchUrl + `year=${year}&`;
        const result = await axios.get<Response>(fetchUrl);
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
