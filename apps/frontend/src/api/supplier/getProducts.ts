import axios from "axios";
import { baseSupplierUrl } from ".";
import { Brand, Product, ProductCategory, Response } from "@/core/types";

export type ProductFilters = {
    supplierId?: string;
    category?: ProductCategory;
    type?: number;
    brandId?: string;
    series?: string[] | string;
    sortBy?: "priceDes" | "priceAsc" | "latest" | "newest";
    cursor?: string;
    limit?: number;
};

export type WithBrandProduct = Product & {
    brand: Brand;
};

function serialize(obj: any) {
    const str: string[] = [];
    for (const p in obj)
        if (obj.hasOwnProperty(p) && obj[p]) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export default async function getProducts(filters: ProductFilters) {
    try {
        if (filters?.series && Array.isArray(filters.series)) {
            filters.series = filters.series.join(",");
        }
        const url = baseSupplierUrl + "/product";
        const queryParams = serialize(filters);
        const results = await axios.get<Response<WithBrandProduct[]>>(
            url + (queryParams.length ? `?${queryParams}` : ""),
        );
        return results.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
