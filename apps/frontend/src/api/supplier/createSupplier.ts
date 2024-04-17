import axios from "axios";
import { baseSupplierUrl } from ".";
import { Response } from "@/core/types";
import { SupplierRegistration } from "@/pages/supplier-registration-page/contexts";

export default async function createSupplier(
    supplier: SupplierRegistration,
    token: string,
) {
    try {
        const result = await axios.post<Response>(
            `${baseSupplierUrl}`,
            supplier,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result.data;
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
}
