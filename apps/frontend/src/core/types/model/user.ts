import { Image, Model, Status } from "./core";
import { Garage } from "./garage";

export const enum Role {
    User = 1,
    Staff = 2,
    GarageOwner = 3,
    Supplier = 4,
    GarageOwnerAndSupplier = 5,
    Admin = 6
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
    isOnline: boolean,
    lastActiveAt: number,
    garageId?: string
}

export type Authority = "WITH_ORDER" | "WITH_INCOME"

export type Staff = User & {
    role: Role.Staff,
    authorities: Authority[],
    garageId: string,
    status: Status
}
