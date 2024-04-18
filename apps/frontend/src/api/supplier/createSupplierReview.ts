import { Response, Review } from "@/core/types";
import { baseSupplierUrl } from ".";
import axios from "axios";
import { auth } from "@/components/firebase";

export default async function createSupplierReview(review: Partial<Review>) {
    try {
        const token = await auth.currentUser?.getIdToken();
        const result = await axios.post<Response>(
            baseSupplierUrl + "/review",
            review,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
