import { Model } from "./core";

export type Report = Model & {
    title: string;
    content: string;
    entityId: string;
    userId: string;
    type: number;
};
