import { Response } from "@/core/types";
import { managementOrderInstance } from ".";
import { EvaluationInfo } from "@/pages/garage-manage-page/contexts/EvaluationContext";

export default async function addOrderPrice(
    id: string | undefined,
    evaluation: EvaluationInfo,
) {
    try {
        const queryParams: string = `/${id}/management/order-price/${evaluation.orderId}`;

        const result = await managementOrderInstance.post<Response>(
            `${queryParams}`,
            evaluation.services,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        return result.data;
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
