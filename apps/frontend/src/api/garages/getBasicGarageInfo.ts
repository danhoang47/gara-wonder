import axios from "axios";
import { baseGaragesUrl } from ".";
import { GarageBasicInfo, Response } from "@/core/types";

export default async function getBasicGarageInfo(
    id: string,
): Promise<Response<[GarageBasicInfo]>> {
    try {
        const result = await axios.get<Response<[GarageBasicInfo]>>(
            `${baseGaragesUrl}/basicInfo/${id}`,
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
