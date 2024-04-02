import { Response } from "@/core/types";
import { managementOrderInstance } from ".";

export default async function moveNextStep(
    id: string | undefined,
    data: { orderId?: string },
    step: number | undefined,
) {
    try {
        let queryParams: string = `/${id}/management/`;
        console.log(step);

        if (step === 2) {
            queryParams += "completed";
        } else {
            queryParams += "step";
        }

        const result = await managementOrderInstance.post<Response>(
            `${queryParams}`,
            data,
        );
        return result.data;
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
