import { Order, Response } from "@/core/types";
import { managementOrderInstance } from ".";

export default async function getOrders(
    id: string | undefined,
    limit: number | undefined,
    cursor: string | undefined | null,
) {
    try {
        let queryParams: string = `/garage/${id}?`;

        if (limit) {
            queryParams += `limit=${limit}`;
        }
        if (cursor) {
            queryParams += `&cursor=${cursor}`;
        }
        if (queryParams.length !== 0) {
            queryParams = queryParams.slice(1);
        }

        const result = await managementOrderInstance.get<Response<Order[]>>(
            `${queryParams}`,
        );
        return result.data;
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
