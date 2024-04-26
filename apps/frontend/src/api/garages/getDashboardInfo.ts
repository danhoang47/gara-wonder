import axios, { AxiosError } from "axios";

import { Response } from "@/core/types";
import garageInstance, { baseGaragesUrl } from ".";

export type DashboardInfoType = {
    numberOdOrderNeedToEvaluate?: number;
    numberOfOrdersNeedToAccept?: number;
    numberOfOrderCheckInToday?: number;
    numberOfOrderCheckOutToday?: number;
    numberOfOrderInProgress?: number;
};

export default async function getDashboardInfo(
    id: string | undefined,
    type: string = "today",
) {
    try {
        const result = await garageInstance.get<Response<DashboardInfoType>>(
            baseGaragesUrl + `/${id}/management/general?type=${type}`,
        );
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
