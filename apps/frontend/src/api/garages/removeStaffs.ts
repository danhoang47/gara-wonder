import { Response, Staff } from "@/core/types";
import garageInstance from ".";

export default async function removeStaffs(garageId: string, staffId: string) {
    try {
        const staffs = await garageInstance.delete<Response<Staff>>(
            `/${garageId}/management/staff/${staffId}`,
        );

        return staffs.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
