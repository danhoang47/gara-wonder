import { Product } from ".";

export type SupplierRegistration = {
    name: string;
    description: string;
    address: string;
    products: Product[];
    openAt: string;
    closeAt: string;
    location: {
        coordinates: [number, number];
    };
    images: File[];
};
