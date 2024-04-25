import { Response } from "@/core/types";
import garageInstance from ".";

export default async function generatePaymentURL(garageId: string, billId: string) {
    try {
        const staffs = await garageInstance.get<Response<{ vnpUrl: string }>>(
            `/${garageId}/management/bills-export/${billId}`,
        );

        return staffs.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
