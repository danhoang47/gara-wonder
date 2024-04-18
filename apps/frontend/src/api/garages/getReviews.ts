import axios, { AxiosError } from "axios";

import { Response, Review } from "@/core/types";
import { baseGaragesUrl } from ".";

export default async function getReviews(id: string | undefined) {
    try {
        const result = await axios.get<
            Response<(Review & { userId: string })[]>
        >(baseGaragesUrl + `/reviews/${id}`);
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
