import { Response } from "@/core/types";
import { managementOrderInstance } from ".";
import { EvaluationInfo } from "@/pages/garage-manage-page/contexts/EvaluationContext";

export default async function handleEvaluation(
    id: string | undefined,
    evaluation: EvaluationInfo,
) {
    try {
        let queryParams: string = `/${id}/management/evaluation`;

        if (queryParams.length !== 0) {
            queryParams = queryParams.slice(1);
        }
        const result = await managementOrderInstance.post<Response>(
            `${queryParams}`,
            JSON.stringify(evaluation),
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
