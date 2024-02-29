import { EstimateType, Garage, Model, User } from ".";

export const enum ProcessStatus {
    Evaluate = 0,
    Prepare,
    Fixing,
    Complete
}

export const enum PayType {
    Cash = 0,
    Banking,
}

export type Order = Model & {
    garageId: Garage["_id"],
    userId: User["_id"],
    evaluationId: Evaluation["_id"],
    carId: Car["_id"],
    serviceIds: string[],
    handOverTime?: number,
    pickUpTime?: number,
    totalPrice: number,
    status: ProcessStatus,
    hasPaid: boolean,
    paymentId?: string,
    payType: PayType
}

export type Car = Model & {
    brandId: string,
    model: string,
    releaseYear: number,
    plateNumber: string,
}

export type Evaluation = Model & {
    estimationType: EstimateType;
    estimateDuration?: [number | null, number | null] | null;
}