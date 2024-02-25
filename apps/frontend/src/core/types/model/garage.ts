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

export type Brand = Model & {
    name: string
}

export type Rule = Model & {
    name: string,
    description?: string,
}

export type Category = Model & {
    name: string,
    description: string,
    icon: string,
}

export type Rating = {
    communicationPoint: number,
    accuracyPoint: number,
    locationPoint: number,
    valuePoint: number
}

// TODO: need certificate of business registration images
export type Garage = BusinessEntity & {
    services: Service[];
    additionalServices: string[];
    defaultSlot: number;
    checkIn?: string;
    checkOut?: string;
    rules?: Rule[],
    rating: Rating,

};

export type GarageFilter = {
    priceRange?: {
        from?: number,
        to?: number,
    }
    ratings?: number[];
    brands?: string[];
    distance?: number;
    additional?: string[];
};
