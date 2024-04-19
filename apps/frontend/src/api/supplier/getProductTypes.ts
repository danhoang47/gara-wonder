import axios from "axios";
import { baseSupplierUrlWithoutSupplier } from ".";
import { ProductType, Response } from "@/core/types";

export default async function getProductTypes() {
    try {
        const result = await axios.get<Response<ProductType[]>>(
            `${baseSupplierUrlWithoutSupplier}/product-type`,
        );
        return result.data;
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
}
