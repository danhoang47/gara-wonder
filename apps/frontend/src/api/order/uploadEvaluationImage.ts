import { Response } from "@/core/types";
import { managementOrderInstance } from ".";

export default async function uploadEvaluationImage(
    id: string | undefined,
    orderId: string,
    images: File[],
) {
    try {
        const queryParams: string = `/${id}/management/evaluation/image`;

        const formData = new FormData();
        formData.append("orderId", orderId);

        images.map((image) => formData.append("evaluationImage", image));

        const result = await managementOrderInstance.post<Response>(
            `${queryParams}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        return result.data;
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}
