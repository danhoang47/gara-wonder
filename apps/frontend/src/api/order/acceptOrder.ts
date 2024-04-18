import { Response } from "@/core/types";
import { orderInstance } from ".";
import { baseGaragesUrl } from "../garages";

export default async function acceptOrder(
    mode: string,
    garageId?: string,
    orderId?: string,
): Promise<Response> {
    try {
        const result = await orderInstance.post<Response>(
            baseGaragesUrl + `/${garageId}/management/orders/${mode}`,
            { orderId: orderId },
        );
        return result.data;
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
