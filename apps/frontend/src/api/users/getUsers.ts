import axios from "axios";
import { baseUsersUrl } from ".";
import { Response, Role, User } from "@/core/types";

export default async function getUsers(
    emailOrPhoneNumber: string,
    role: Role = Role.User,
) {
    try {
        const results = await axios.get<Response<User[]>>(
            baseUsersUrl + `?text=${emailOrPhoneNumber}&role=${role}`,
        );
        return results.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
