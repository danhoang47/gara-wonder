import { Response } from "@/core/types";
import { managementOrderInstance } from ".";
import { EvaluationInfo } from "@/pages/garage-manage-page/contexts/EvaluationContext";

export default async function handleEvaluation(
    id: string | undefined,
    evaluation: EvaluationInfo,
) {
    try {
        let evab = evaluation;
        let queryParams: string = `/${id}/management/evaluation`;
        if (
            // @ts-expect-error null compare
            evaluation?.estimateDuration[0] === evaluation?.estimateDuration[1]
        ) {
            evab = {
                ...evaluation,
                estimateDuration: [null, evaluation?.estimateDuration[0]],
            };
        }
        if (queryParams.length !== 0) {
            queryParams = queryParams.slice(1);
        }
        const result = await managementOrderInstance.post<Response>(
            `${queryParams}`,
            JSON.stringify(evab),
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
