import { Report } from "@/core/types";
import userInstance from ".";

export default async function createGarageReport(report: Partial<Report>) {
    try {
        const result = await userInstance.post(
            "/report/" + report.entityId,
            report,
        );
        return result.data;
    } catch (_error) {
        return Promise.reject;
    }
}
