import axios from "axios";
import { baseGaragesUrl } from ".";
import { Category, Response, Service } from "@/core/types";

export type WithCategoryService = Service & {
    category: Category;
};

export default async function getGarageServices(
    api: string,
): Promise<Response<WithCategoryService[]>> {
    try {
        const result = await axios.get(`${baseGaragesUrl}/${api}`);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
