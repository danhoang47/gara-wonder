import axios from "axios";

import { Response } from "@/core/types";
import { baseAdminUrl } from ".";

export default async function getStatictics(year: string | number = 2024) {
    try {
        const url = baseAdminUrl + `/income?year=${year}`;

        const result = await axios.get<Response>(url);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
