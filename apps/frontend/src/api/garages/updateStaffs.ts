import { Response, Staff } from "@/core/types";
import garageInstance from ".";

export default async function updateStaffs(
    garageId: string,
    staffId: string,
    authorities: Staff["authorities"],
) {
    try {
        const staffs = await garageInstance.put<Response<Staff>>(
            `/${garageId}/management/staff/${staffId}`,
            { authorities },
        );

        return staffs.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
