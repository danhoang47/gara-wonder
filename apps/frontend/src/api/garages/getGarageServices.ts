import axios from "axios";
import { baseGaragesUrl } from ".";
import { Category, Response, Service } from "@/core/types";

export type WithCategoryService = Service & {
    category: Category;
    status: boolean;
};

export default async function getGarageServices(
    api: string, // server/:garageId
): Promise<Response<WithCategoryService[]>> {
    try {
        // /garage/server/:garageId
        const result = await axios.get(`${baseGaragesUrl}/${api}`);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
