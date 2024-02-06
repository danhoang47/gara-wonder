import { BusinessEntity, Model } from "./core";

export type Service = Partial<
    Model & {
        garageId: Garage["_id"];
        serviceId: string;
        brandIds: string[] | "all";
        lowestPrice: number;
        highestPrice: number;
    }
>;

// TODO: need certificate of business registration images
export type Garage = BusinessEntity & {
    services: Service[];
};

export type GarageFilter = {
    lowestPrice?: number;
    highestPrice?: number;
    rating?: number[];
    supportedBrands?: string[];
    distance?: string[];
    additional?: {
        hasCafe?: boolean;
        hasSmokingArea?: boolean;
    };
};
