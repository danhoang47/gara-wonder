import userInstance from ".";
import { Response, User } from "@/core/types";

export default async function acceptOrRejectInvitations(invitationId: string, type: number) {
    try {
        const results = await userInstance.post<Response<User>>(`/invitations/${invitationId}?type=${type}`);
        return results.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
