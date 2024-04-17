import axios from "axios";
import { baseSupplierUrl } from ".";
import { WithBrandProduct } from "./getProducts";
import { Response, Supplier } from "@/core/types";

export type WithSupplierProduct = WithBrandProduct & {
    supplier: Omit<Supplier, "products">;
};

export default async function getProductById(id: string) {
    try {
        const result = await axios.get<Response<WithSupplierProduct>>(
            baseSupplierUrl + "/product/" + id,
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
