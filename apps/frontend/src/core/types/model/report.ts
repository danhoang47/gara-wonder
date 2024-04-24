import { Model } from "./core";

export type Report = Model & {
    content: string;
    entityId: string;
    userId: string;
    type: number,
};
