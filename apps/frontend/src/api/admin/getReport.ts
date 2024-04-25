import axios from "axios";

import { Image, Report, Response } from "@/core/types";
import { baseAdminUrl } from ".";

export type ReportType = Report & {
    _id: string;
    name: string;
    backgroundImage: Image[];
    userId: {
        _id: string;
        displayName: string;
        photoURL: string;
    };
    entityId: {
        _id: string;
        name: string;
        backgroundImage: Image[];
    };
};

export default async function getReport(
    month: number = 4,
    year: number = 2024,
    sort: string = "asc",
    type: string = "1",
) {
    try {
        const url =
            baseAdminUrl + `/report?month=${month}&year=${year}&sort=${sort}&type=${type}`;

        const result = await axios.get<Response<ReportType[]>>(url);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
