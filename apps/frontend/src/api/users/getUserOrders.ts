import axios, { AxiosError } from "axios";

import { baseUsersUrl } from ".";
import { Response } from "@/core/types";
import { OrderListType } from "../order/getOrders";

export default async function getUserOrders(
    token: string | undefined,
    limit: number | undefined,
    cursor: string | undefined | null,
    sort: string = "asc",
) {
    try {
        let queryParams: string = `/orders?`;

        if (limit) {
            queryParams += `limit=${limit}`;
        }
        if (cursor) {
            queryParams += `&cursor=${cursor}`;
        }
        const result = await axios.get<Response<OrderListType[]>>(
            baseUsersUrl + queryParams + `&sort${sort}`,

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
