import { Response } from "@/core/types";
import { baseSupplierUrl } from ".";
import axios from "axios";
import { auth } from "@/components/firebase";

export default async function getReviewableStatus(supplierId: string) {
    try {
        const token = await auth.currentUser?.getIdToken();
        const result = await axios.put<Response<boolean>>(
            baseSupplierUrl + `/${supplierId}/review/status`,
            undefined,
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
