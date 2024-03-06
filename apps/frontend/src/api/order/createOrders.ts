import { Order, Response } from "@/core/types";
import { orderInstance } from ".";

export default async function createOrder(orders: Order | Order[], token?: string): Promise<Response> {
    try {
        const result = await orderInstance.post("", Array.isArray(orders) ? orders : [orders], {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return result.data
    } catch (err) {
        throw new Error(JSON.stringify(err))
    }
}
