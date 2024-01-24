import { Shop } from ".";
import { Image, Model } from "./core";
import { Garage } from "./garage";

export const enum ActorType {
    User = 1,
    GarageOwner = 2,
    Supplier = 3,
    GarageOwnerAndSupplier = 4,
}

export type User = Model & {
    type: ActorType,
    citizenId: string,
    frontSideCitizenIdCardImage: Image,
    backSideCitizenIdCardImage: Image,
    favoriteGarageIds: Garage["_id"][],
    favoriteShopIds: Shop["_id"][],
}
