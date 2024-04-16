import {
    Brand,
    Car,
    Category,
    Order,
    Response,
    Service,
    User,
} from "@/core/types";
import { managementOrderInstance } from ".";

export type ServiceOrderType = Service & { category: Category };

export type OrderDetailType = Order & {
    user: Omit<
        User,
        | "car"
        | "role"
        | "frontSideCitizenIdCardImage"
        | "backSideCitizenIdCardImage"
        | "favoriteGarageIds"
    >;
    car: Car & { brand: Brand };
    estimateHandOffTime: number;
    services: ServiceOrderType[];
};

export default async function getOrderById(param: string | undefined) {
    try {
        const queryParams: string = `/${param}?`;
        const result = await managementOrderInstance.get<
            Response<OrderDetailType[]>
        >(`${queryParams}`);
        return result.data.data[0];
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
