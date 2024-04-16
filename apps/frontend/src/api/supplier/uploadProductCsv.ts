import axios from "axios";
import { baseSupplierUrl } from ".";
import { Product, Response } from "@/core/types";

export default async function uploadProductCsv({ file }: { file: File }) {
    try {
        const formData = new FormData();

        if (file) {
            formData.append("products", file);
        }

        const result = await axios.post<Response<Product[]>>(
            `${baseSupplierUrl}/product/parse`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
