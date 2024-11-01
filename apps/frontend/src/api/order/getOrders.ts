import {
    Brand,
    Car,
    Category,
    Garage,
    Image,
    Order,
    Response,
    Service,
    User,
} from "@/core/types";
import { managementOrderInstance } from ".";

export type OrderListType = Omit<Order, "car" | "userId" | "garageId"> & {
    car: Car & { brand: Brand };
    services: (Service & { name: string; category: Category })[];
    estimateHandOffTime: number;
    userId: User;
    evaluationRequired: boolean;
    handOverTime: number;
    status: number;
    evaluationCheck: boolean;
    garageId: Omit<Garage, "backgroundImage"> & { backgroundImage: Image[] };
};

export default async function getOrders(
    id: string | undefined,
    limit: number | undefined,
    cursor: string | undefined | null,
    sort: string = "desc",
) {
    try {
        let queryParams: string = `/${id}/management/orders?sort=${sort}&`;

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
