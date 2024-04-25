import { Image, Model } from "./core";
import { Garage } from "./garage";
import { Car } from "./order";

export const enum Role {
    User = 1,
    Staff = 2,
    GarageOwner = 3,
    Supplier = 4,
    GarageOwnerAndSupplier = 5,
    Admin = 6,
}

export type User = Model & {
    role: Role;
    uid: string;
    email?: string;
    emailVerified: boolean;
    displayName: string;
    isAnonymous?: boolean;
    photoURL: string;
    phoneNumber?: string;
    citizenId?: string;
    frontSideCitizenIdCardImage?: Image;
    backSideCitizenIdCardImage?: Image;
    favoriteGarageIds?: Garage["_id"][];
    isOnline: boolean;
    lastActiveAt: number;
    garageId?: string;
    supplierId?: string;
    dob?: string;
    cars: PersonalCar[];
    authorities?: Authority[];
};

export type PersonalCar = Model &
    Car & {
        memo: string;
    };

export type Authority = "WITH_ORDER" | "WITH_INCOME" | "WITH_SCHEDULE";
