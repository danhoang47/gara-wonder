import axios from "axios";
import { baseUrl } from ".";
import { Response } from "@/core/types";

export default async function getGarageServices(id: string): Promise<Response> {
    try {
        const result = await axios.get<Response>(`${baseUrl}/service/${id}`);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
