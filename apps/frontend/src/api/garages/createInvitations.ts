import { auth } from "@/components/firebase";
import axios from "axios";
import { baseGaragesUrl } from ".";
import { Response, Invitation } from "@/core/types";

export default async function getInvitationsByGarageId(
    garageId: string,
    userIds: string[],
) {
    try {
        const token = await auth.currentUser?.getIdToken();
        const results = await axios.post<Response<Invitation[]>>(
            baseGaragesUrl + `/${garageId}/management/invitations`,
            { userIds: userIds },
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
