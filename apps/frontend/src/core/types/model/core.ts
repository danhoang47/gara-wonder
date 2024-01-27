import { User } from "./user"

export type Model = {
    _id: string,
<<<<<<< HEAD
    createdAt: number,
=======
    createdAt: number, 
>>>>>>> 74c5f295596f66020ff640b2611b5791924b65ff
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