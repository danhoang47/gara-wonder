import axios from "axios";

import { Garage, Response } from "@/core/types";
import { baseAdminUrl } from ".";
export type GarageRequire = Garage;

export default async function getAcceptRequireGarage(
    status?: number,
    fieldName: string = "name",
    sort: string = "desc",
    year: string | number = 2024,
) {
    try {
        let url =
            baseAdminUrl +
            `/garages?fieldName=${fieldName}&sort=${sort}&year=${year}`;
        if (status !== undefined) {
            url = url + `&status=${status}`;
        }
        const result = await axios.get<Response<Garage[]>>(url);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
