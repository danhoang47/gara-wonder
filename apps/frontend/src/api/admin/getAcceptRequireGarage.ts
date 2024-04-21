import axios from "axios";

import { Garage, Response } from "@/core/types";
import { baseAdminUrl } from ".";
export type GarageRequire = Garage;

export default async function getAcceptRequireGarage(
    status?: string,
    fieldName: string = "name",
    sort: string = "desc",
    year: string | number = 2024,
) {
    try {
        let url =
            baseAdminUrl +
            `/garages?fieldName=${fieldName}&sort=${sort}&year=${year}`;
        if (status !== undefined || status !== "") {
            url = url + `&status=${status}`;
        }
        const result = await axios.get<Response<Garage[]>>(url);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
