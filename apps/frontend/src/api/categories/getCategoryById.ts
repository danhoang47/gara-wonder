import axios from "axios";

import { baseCategoriesUrl } from ".";
import { Response, Category } from "@/core/types";

export default async function getCategoryById(id: string): Promise<Category> {
    try {
        const result = (
            await axios.get<Response<Category>>(baseCategoriesUrl + `/${id}`)
        ).data;
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
