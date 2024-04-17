import axios from "axios"
import { baseSupplierUrl } from "."
import { Brand, Product, ProductCategory, Response } from "@/core/types";

export type ProductFilters = {
    supplierId?: string,
    category?: ProductCategory,
    type?: number,
    brandId?: string,
    series?: string[] | string,
    sortBy?: "priceDes" | "priceAsc" | "latest" | "newest",
    cursor?: string,
    limit: number,
}

export type WithBrandProduct = Product & {
    brand: Brand
}

export default async function getProducts(filters: ProductFilters) {
    try {        
        if (filters?.series && Array.isArray(filters.series)) {
            filters.series = filters.series.join(",") 
        }

        const queryParams = new URLSearchParams(filters)
        const url = baseSupplierUrl + "/product?" + queryParams.toString()

        const results = await axios.get<Response<WithBrandProduct[]>>(url)
        return results.data
    } catch (error) {
        return Promise.reject(error)
    }
}