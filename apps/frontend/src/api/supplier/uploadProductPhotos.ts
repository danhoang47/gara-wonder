import axios from "axios";
import { baseSupplierUrl } from ".";
import { Product, Response } from "@/core/types";

export default async function uploadProductPhotos(token: string) {
    try {
        const formData = new FormData();

        const result = await axios.post<Response<Product[]>>(
            `${baseSupplierUrl}/product/parse`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token
                },
            },
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
