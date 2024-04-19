import { Image, Model } from ".";

export enum ProductCategory {
    Interior = 0,
    Exterior,
}

export type Product = Model & {
    category: ProductCategory; // Danh mục
    name: string;
    type: number; // Loại sản phẩm
    brandId: string; // merc
    series: string[]; // Dòng xe
    year: number;
    price: number;
    images: Image[];
    quantity: number;
    description: string;
};

export type ProductType = Model & {
    code: number;
    name: string;
    category: ProductCategory;
};

export type ProductFilter = {
    type?: string;
    brandId?: string;
    series?: string;
    models?: string;
    category?: ProductCategory;
};
