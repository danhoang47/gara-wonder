import { Order, Response } from "@/core/types";
import { orderInstance } from ".";

export default async function getOrders(
    id: string | undefined,
    limit: number | undefined,
    cursor: string | undefined | null,
) {
    try {
        let queryParams: string = `/${id}?`;

        if (limit) {
            queryParams += `limit=${limit}`;
        }
        if (cursor) {
            queryParams += `&cursor=${cursor}`;
        }
        if (queryParams.length !== 0) {
            queryParams = queryParams.slice(1);
        }

        const result = await orderInstance.get<Response<Order[]>>(
            `${queryParams}`,
        );
        return result.data;
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
