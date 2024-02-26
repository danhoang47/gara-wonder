import axios from "axios";
import { baseGaragesUrl } from ".";
import { Garage, Response } from "@/core/types";

export default async function getGarageServices(
    api: string,
): Promise<Response<Garage["services"]>> {
    try {
        const result = await axios.get(`${baseGaragesUrl}/${api}`);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
