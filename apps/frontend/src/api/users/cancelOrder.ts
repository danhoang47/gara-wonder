import axios from "axios";

import { Response, User } from "@/core/types";
import { auth } from "@/components/firebase";

export default async function cancelOrder(
    garageId?: string,
    orderId?: string,
): Promise<Response> {
    try {
        const token = await auth.currentUser?.getIdToken(true);
        const result = await axios.post<Response<User>>(
            import.meta.env.VITE_API_URL + `/order/cancel`,
            {
                garageId: garageId,
                orderId: orderId, 
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
