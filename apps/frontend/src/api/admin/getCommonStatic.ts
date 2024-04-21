import axios from "axios";

import { Response } from "@/core/types";
import { baseAdminUrl } from ".";

export const enum StaticSection {
    incomeThisMonth = "Doanh số tháng này",
    unchargedThisMonth = "Phí chưa thanh toán",
    acceptedPendingGarage = "Garage đăng ký",
    acceptedGarage = "Garage chưa được duyệt",
    reportNumber = "Báo cáo đang chờ",
}

export type StaticProps = {
    total: number;
    diff: number;
};

export type StaticType = Record<
    keyof typeof StaticSection | string,
    StaticProps
>;
export default async function getCommonStatic(month: number, year: number) {
    try {
        const result = await axios.get<Response<StaticType>>(
            baseAdminUrl + `/general?month=${month}&year=${year}`,
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
