import { Image, Model } from "./core";
import { Garage } from "./garage";

export const enum Role {
    User = 1,
    GarageOwner = 2,
    Supplier = 3,
    GarageOwnerAndSupplier = 4,
}

export type User = Model & {
    role: Role,
    uid: string, 
    email?: string,
    emailVerified: boolean,
    displayName: string, 
    isAnonymous?: boolean,
    photoURL: string, 
    phoneNumber?: string
    citizenId?: string,
    frontSideCitizenIdCardImage?: Image,
    backSideCitizenIdCardImage?: Image,
    favoriteGarageIds?: Garage["_id"][],
}
