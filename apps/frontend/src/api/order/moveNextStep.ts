import { Response } from "@/core/types";
import { managementOrderInstance } from ".";

export default async function moveNextStep(
    id: string | undefined,
    data: { orderId?: string },
) {
    try {
        const queryParams: string = `/${id}/management/step`;

        const result = await managementOrderInstance.post<Response>(
            `${queryParams}`,
            data,
        );
        return result.data;
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
