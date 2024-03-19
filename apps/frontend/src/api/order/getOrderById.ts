import { Brand, Car, Order, Response, User } from "@/core/types";
import { managementOrderInstance } from ".";

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
};

export default async function getOrderById(id: string | undefined) {
    try {
        const queryParams: string = `/order/${id}?`;
        const result = await managementOrderInstance.get<
            Response<OrderDetailType[]>
        >(`${queryParams}`);
        return result.data.data[0];
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
