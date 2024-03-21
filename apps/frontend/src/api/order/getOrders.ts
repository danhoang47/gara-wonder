import { Brand, Car, Order, Response, Service } from "@/core/types";
import { managementOrderInstance } from ".";

export type OrderListType = Omit<Order, "car"> & {
    car: Car & { brand: Brand };
    services: (Service & { name: string })[];
    estimateHandOffTime: number;
};

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

        const result = await managementOrderInstance.get<
            Response<OrderListType[]>
        >(`${queryParams}`);
        return result.data;
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
