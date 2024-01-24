import { BusinessEntity, Model } from "./core"

export type Service = Model & {
    garageId: Garage["_id"],
}

// TODO: need certificate of business registration images
export type Garage = BusinessEntity & {
    services: Service[]
}