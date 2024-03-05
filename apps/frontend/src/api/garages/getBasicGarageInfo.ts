import axios from "axios";
import { baseGaragesUrl } from ".";
import { Garage, Response, User } from "@/core/types";

export type GarageBasicInfo = Omit<Garage, "services" | "images" | "staff"> & {
    staff: Array<Pick<User, "_id" | "displayName" | "photoURL">>;
};

export default async function getBasicGarageInfo(
    id: string,
): Promise<Response<GarageBasicInfo[]>> {
    try {
        const result = await axios.get<Response<GarageBasicInfo[]>>(
            `${baseGaragesUrl}/basicInfo/${id}`,
        );
        return result.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}
