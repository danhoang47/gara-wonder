import { Model } from ".";

export enum Category {
    Interior = 0,
    Exterior
}

export type Product = Model & {
    category: Category,
    type: string,
    brandId: string,
    series: string[],
    models: string[],
    year: number,
    price: number
}