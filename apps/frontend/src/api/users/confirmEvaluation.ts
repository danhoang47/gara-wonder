import axios from "axios";

import { baseUsersUrl } from ".";
import { Response, User } from "@/core/types";

export default async function confirmEvaluation(
    evaluation: { evaluationId?: string; type?: number },
    token: string | undefined,
): Promise<Response> {
    try {
        const result = await axios.post<Response<User>>(
            baseUsersUrl + "/evaluation",
            evaluation,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
