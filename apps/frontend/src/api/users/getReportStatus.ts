import { Response } from "@/core/types";
import userInstance from ".";

export default async function getReportStatus(garageId: string) {
    try {
        const result = await userInstance.get<Response<boolean>>(
            "/report/" + garageId + "/status",
        );
        return result.data;
    } catch (_error) {
        return Promise.reject;
    }
}
