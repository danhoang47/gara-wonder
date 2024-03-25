import { Image, Model } from ".";

export enum Category {
    Interior = 0,
    Exterior,
}

export type Product = Model & {
    category: Category;
    name: string;
    type: string;
    brandId: string; // merc
    series: string[]; // C-series
    models: string[]; // C200/C300/C200 AMG
    year: number;
    price: number;
    images: Image[];
    remain: number;
};

export type ProductFilter = {
    type?: string;
    brandId?: string;
    series?: string;
    models?: string;
};
