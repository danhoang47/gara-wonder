import axios, { AxiosError } from "axios";

import { Response } from "@/core/types";
import { baseGaragesUrl } from ".";

type queryType = {
    startTime: number;
    endTime: number;
};
export default async function getScheduleSlot(
    id: string | undefined,
    queryParam: queryType,
) {
    try {
        let fetchUrl = baseGaragesUrl + `/${id}/management/schedule?`;
        if (queryParam) {
            fetchUrl = fetchUrl + `startTime=${queryParam.startTime}&`;
            fetchUrl = fetchUrl + `endTime=${queryParam.endTime}`;
        }
        const result = await axios.get<Response>(fetchUrl);
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
