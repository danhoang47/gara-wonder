import { EstimateType, Garage, Model, User } from ".";

export const enum ProcessStatus {
    Evaluate = 0,
    Prepare,
    Fixing,
    Complete
}

export enum PayType {
    Cash = 0,
    Banking,
}

export enum OrderStatus {
    Pending = 0,
    Accepted,
    Canceled,
    Rejected
}

export type Order = Model & {
    garageId: Garage["_id"],
    userId: User["_id"],
    evaluationId?: Evaluation["_id"],
    car: Car,
    serviceIds: string[],
    orderTime: number,
    handOverTime?: number,
    pickUpTime?: number,
    totalPrice: number,
    status?: ProcessStatus,
    hasPaid?: boolean,
    paymentId?: string,
    payType: PayType,
    orderStatus?: OrderStatus 
}

export type Car = {
    brandId: string,
    model: string,
    releaseYear: number,
    plateNumber: string,
}

export type Evaluation = Model & {
    estimationType: EstimateType;
    estimateDuration?: [number | null, number | null] | null;
}