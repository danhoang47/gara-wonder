import { Bill, Response, User } from "@/core/types";
import garageInstance from ".";

export type WithUserBill = Partial<Omit<Bill, "paidBy">> & {
    paidBy: User,
    garageName: string
}

export default async function getBillings(garageId: string) {
    try {
        const staffs = await garageInstance.get<Response<WithUserBill[]>>(
            `/${garageId}/management/bills`,
        );

        return staffs.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
