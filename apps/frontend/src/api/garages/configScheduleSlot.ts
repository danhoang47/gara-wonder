import axios from "axios";

import { baseGaragesUrl } from ".";
import { Response } from "@/core/types";

export type ScheduleProps = {
    date: string | number;
    slot: number;
    disabled: boolean;
    extraFee: number;
};

export default async function configScheduleSlot(
    garageId?: string,
    body?: ScheduleProps[],
) {
    try {
        const result = await axios.post<Response>(
            baseGaragesUrl + `/${garageId}/management/schedule/date-config`,
            body,
        );

        return result.data;
    } catch (error) {
        throw new Error("Server Error");
    }
}
