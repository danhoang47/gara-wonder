import { Response, Staff } from "@/core/types";
import axios from "axios";

export default async function getStaffs(garageId: string) {
    try {
        const staffs = await axios.get<Response<Staff[]>>(
            `/${garageId}/management/staff`,
        );

        return staffs.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
