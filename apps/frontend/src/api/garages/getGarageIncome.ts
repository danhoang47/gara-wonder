import axios from "axios";
import { baseGaragesUrl } from ".";
import { Garage, Response } from "@/core/types";

export default async function getGarageIncome(
    garageId?: string,
    token?: string,
    year: string | number = "2024",
): Promise<Response<Garage["images"]>> {
    try {
        const result = await axios.get(
            `${baseGaragesUrl}/${garageId}/management/general/income?year=${year}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
