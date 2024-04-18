import { Model } from "./core";

export type Review = Model & {
    content: string;
    ratingPoint: number;
    tags: string;
    entityId: string;
    userId: string;
};
