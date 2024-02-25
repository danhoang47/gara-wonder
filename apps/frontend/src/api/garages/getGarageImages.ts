import axios from "axios";
import { baseUrl } from ".";
import { Response } from "@/core/types";

export default async function getGarageImages(id: string): Promise<Response> {
    try {
        const result = await axios.get<Response>(`${baseUrl}/images/${id}`);
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
