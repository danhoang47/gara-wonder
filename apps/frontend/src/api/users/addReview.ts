import axios, { AxiosError } from "axios";
import { Response, Review } from "@/core/types";
import { baseUsersUrl } from ".";

export default async function addReview(
    body: Partial<Review>,
    garageId?: string,
    token?: string,
) {
    try {
        const result = await axios.post<Response>(
            baseUsersUrl + `/review/${garageId}`,
            body,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify((error as AxiosError).response?.data));
    }
}
