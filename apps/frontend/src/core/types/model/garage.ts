import { BusinessEntity, Model } from "./core";

export type Service = Partial<
    Model & {
        garageId: Garage["_id"];
        categoryId: string;
        brandIds: string[] | "all";
        lowestPrice: number;
        highestPrice: number;
    }
>;

// TODO: need certificate of business registration images
export type Garage = BusinessEntity & {
    services: Service[];
    additionalServices: string[];
};

export type GarageFilter = {
    priceRange?: {
        from?: number,
        to?: number,
    }
    ratings?: number[];
    brands?: string[];
    distance?: number;
    additional?: {
        hasCafe?: boolean;
        hasSmokingArea?: boolean;
    };
};
