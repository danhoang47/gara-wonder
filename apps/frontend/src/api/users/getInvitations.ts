import { auth } from "@/components/firebase";
import axios from "axios";
import { baseUsersUrl } from ".";
import { Response, Invitation } from "@/core/types";

export default async function getInvitations() {
    try {
        const token = await auth.currentUser?.getIdToken();
        const results = await axios.get<Response<Invitation[]>>(
            baseUsersUrl + "/invitations",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            },
        );

        return results.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
