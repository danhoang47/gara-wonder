import { User } from "./user"

export type Model = {
    _id: string,
    createdAt: number,
    updatedAt: number,
}

export type Cursor = {
    cursor?: string,
    nextCursor?: string,
    limit?: number,
    total?: number,
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
    district: District,
    province: Province,
    ward: Ward,
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


export type Province = {
    province_id: number;
    province_name: string;
    province_type: string;
};

export type District = {
    district_id: string;
    district_name: string;
    district_type: string;
    lat?: string;
    lng?: string;
    province_id: string;
};

export type Ward = {
    ward_id: string;
    ward_name: string;
    district_id: string;
    ward_type: string;
}
