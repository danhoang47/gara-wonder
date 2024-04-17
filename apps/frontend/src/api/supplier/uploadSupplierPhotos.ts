import axios from "axios";
import { baseSupplierUrl } from ".";
import { Product, Response } from "@/core/types";
import { ObjectId } from "bson";

export default async function uploadSupplierPhotos(
    images: Array<{ _id?: ObjectId; images?: File[] }>,
    token: string,
) {
    try {
        const formData = new FormData();

        if (images) {
            images.forEach((product) => {
                const id = product._id?.toString();

                product.images?.forEach((file) => {
                    formData.append(id!, file);
                });
            });
        }

        const result = await axios.post<Response<Product[]>>(
            `${baseSupplierUrl}/product/photo/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token,
                },
            },
        );
        return result.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
