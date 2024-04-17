import { Model, Product, User } from ".";

export type Supplier = Model & {
    userId?: User["_id"];
    backgroundURL?: string;
    name: string;
    description: string;
    address: string;
    products: Product[];
    openAt: string;
    closeAt: string;
    location: {
        coordinates: [number, number];
    };
};
