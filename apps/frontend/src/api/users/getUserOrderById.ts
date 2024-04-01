import axios, { AxiosError } from "axios";

import { baseUsersUrl } from ".";
import { Response } from "@/core/types";
import { OrderDetailType } from "../order/getOrderById";

export default async function getUserOrderById(
    id: string | undefined,
    token: string | undefined,
) {
    try {
        const result = await axios.get<Response<OrderDetailType>>(
            baseUsersUrl + `/orders/${id}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
