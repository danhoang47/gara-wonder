import axios, { AxiosError } from "axios";

import {
    Category,
    Evaluation,
    Image,
    Model,
    Response,
    Service,
} from "@/core/types";
import { baseGaragesUrl } from ".";

export type EvaluationType = Model &
    Evaluation & {
        orderId: string;
        evaluationImgs: Image[];
        imageUploadingStatus: number;
        extraFee: number;
        description: string;
        services: (Service & { category: Category; price: number })[];
    };
export default async function getOrderEvaluation(id: string | undefined) {
    try {
        const result = await axios.get<Response<EvaluationType>>(
            baseGaragesUrl + `/evaluation/${id}`,
        );
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
