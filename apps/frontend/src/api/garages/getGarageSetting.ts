import axios from "axios";
import { baseGaragesUrl } from ".";
import { Category, Response, Service } from "@/core/types";

export type WithCategoryService = Service & {
    category: Category;
    status: boolean;
};

export default async function getGarageSetting(
    api: string, // server/:garageId
) {
    try {
        // /garage/server/:garageId
        const result = await axios.get<
            Response<{
                isAcceptOrderAuto: boolean | undefined;
                refundPolicy: number | undefined;
            }>
        >(`${baseGaragesUrl}/${api}`);
        return result.data.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
