import axios, { AxiosError } from "axios";
import { Response } from "@/core/types";
import { baseUsersUrl } from ".";

export type PaymentType = {
    paymentUrl: {
        vnpUrl: string;
        orderId: string;
        createDate: string;
    };
};
export default async function CreatePayment(
    body: {
        garageId?: string;
        orderId?: string;
    },
    token?: string,
) {
    try {
        const result = await axios.post<Response<PaymentType>>(
            baseUsersUrl + "/payment",
            body,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
