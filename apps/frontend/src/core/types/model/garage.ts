import { BusinessEntity, Model, Paging } from "./core";

export enum EstimateType {
    SameDay = 0,
    Exact,
    InRange,
    UnEstimated,
}

export type Service = Partial<
    Model & {
        garageId: Garage["_id"];
        categoryId: string;
        brandIds: string[] | "all";
        lowestPrice: number;
        highestPrice: number;
        isSupported: boolean;
        isProvidedEvaluation?: boolean;
        estimationType: EstimateType;
        estimateDuration?: [number | null, number | null] | null;
    }
>;

export type Brand = Model & {
    name: string;
    series: string[];
};

export type AdditionalService = Model & {
    name: string;
};

export type Rule = Model & {
    name: string;
    description?: string;
};

export enum CategoryType {
    Fix = 0,
    Upgrade,
    Unwrap,
    Wash,
    Replace,
    Exterior,
    Interior,
}

export type Category = Model & {
    name: string;
    description: string;
    icon: string;
    type: CategoryType;
};

export type Rating = {
    communicationPoint: number;
    accuracyPoint: number;
    locationPoint: number;
    valuePoint: number;
};

export type DateSlot = {
    date: number;
    slot: number;
    numberOfOrder: number;
};

// TODO: need certificate of business registration images
export type Garage = BusinessEntity & {
    services: Service[];
    additionalServices: AdditionalService[];
    defaultSlot: number;
    checkIn?: string;
    checkOut?: string;
    rules?: Rule[];
    rating: Rating;
    enableInstantBooking?: boolean;
    dateSlots?: DateSlot[];
};

export type GarageFilter = {
    priceRange?: {
        from?: number;
        to?: number;
    };
    ratings?: number[];
    brands?: string[];
    distance?: number;
    additional?: string[];
    isFavorite?: string | boolean;
};

export type GarageQueryParams = GarageFilter &
    Paging & {
        sortBy?: string;
        category?: string;
        token?: string;
        lat?: string;
        lng?: string;
    };

export type Staff = Model & {
    authorities: string[];
    userId: string;
    garageId: string;
    displayName: string;
    email?: string;
    phoneNumber?: string | null;
    isOnline?: boolean;
    photoURL?: string;
};

export type Bill = Model & {
    garageId: string;
    paidBy?: string;
    hasPaid?: boolean;
    paidAt: number;
    totalIncome: number;
    paidFee: number;
};
