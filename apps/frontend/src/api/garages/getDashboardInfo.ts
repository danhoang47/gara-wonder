import axios, { AxiosError } from "axios";

import { Response } from "@/core/types";
import { baseGaragesUrl } from ".";

export type DashboardInfoType = {
    numberOdOrderNeedToEvaluate?: number;
    numberOfOrdersNeedToAccept?: number;
    numberOfOrderCheckInToday?: number;
    numberOfOrderCheckOutToday?: number;
    numberOfOrderInProgress?: number;
};

export default async function getDashboardInfo(
    id: string | undefined,
    token?: string,
    type: string = "today",
) {
    try {
        const result = await axios.get<Response<DashboardInfoType>>(
            baseGaragesUrl + `/${id}/management/general?type=${type}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
