import { Order, Response } from "@/core/types";
import { orderInstance } from ".";
import { AxiosError, HttpStatusCode } from "axios";

export default async function createOrder(
    orders: Order | Order[],
    token?: string,
): Promise<Response> {
    try {
        const result = await orderInstance.post(
            "",
            Array.isArray(orders) ? orders : [orders],
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result.data;
    } catch (error) {
        const { response } = error as AxiosError;

        console.log(response?.status)
        if (response?.status === 469) {
            return Promise.reject({
                reason: 1
            });
        }

        return Promise.reject(error);
    }
}
