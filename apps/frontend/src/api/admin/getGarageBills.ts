import { Bill, Response, User } from "@/core/types";
import axios from "axios";

export type WithUserBill = Partial<Omit<Bill, "paidBy">> & {
    paidBy: User,
    garageName: string
}

export default async function getBillings(garageId: string) {
    try {
        const staffs = await axios.get<Response<WithUserBill[]>>(
            `/${garageId}/management/bills`,
        );

        return staffs.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
