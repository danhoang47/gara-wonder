import { Response, Staff } from "@/core/types";
import garageInstance from ".";

export default async function getStaffs(garageId: string) {
    try {
        const staffs = await garageInstance.get<Response<Staff[]>>(
            `/${garageId}/management/staff`,
        );

        return staffs.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
