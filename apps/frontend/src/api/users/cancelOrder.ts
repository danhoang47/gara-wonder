import axios from "axios";

import { baseUsersUrl } from ".";
import { Response, User } from "@/core/types";

export default async function cancelOrder(
    garageId?: string,
    orderId?: string,
): Promise<Response> {
    try {
        const result = await axios.post<Response<User>>(
            baseUsersUrl + `/cancel`,
            {
                garageId: garageId,
                orderId: orderId,
            },
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
