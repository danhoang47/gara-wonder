import { User } from "./user"

export type Model = {
    _id: string,
    createdAt: number, 
    updatedAt: number,
}

export type Image = Model & {
    width: number,
    height: number,
    url: string
}

export const enum Status {
    Active = 1,
    InActive = 0,
}

export type Address = {
    district: string,
    city: string,
    country: string,
    streetAddress: string,
    longitude: string,
    latitude: string
}

export type BusinessEntity = 
Model & Address & {
    userId: User["_id"],
    name: string,
    description: string,
    backgroundImage: Image,
    images: Image[],
    status: Status,
    openAt: number,
    closeAt: number,
}