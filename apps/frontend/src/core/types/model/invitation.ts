import { Model } from "./core";

export enum InvitationStatus {
    Pending = 0,
    Accepted,
    Rejected,
}

export type Invitation = Model & {
    entityId: string;
    userId: string;
    status: InvitationStatus;
};
