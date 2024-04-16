import { Product, User } from ".";

export type SupplierRegistration = {
    userId?: User["_id"];
    backgroundURL?: string,
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
