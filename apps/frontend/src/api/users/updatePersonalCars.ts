import userInstance from ".";
import { Car, Response, User } from "@/core/types";

export default async function updatePersonalCars(car: Partial<Car>) {
    try {
        const results = await userInstance.put<Response<User>>(`/car`, car);
        return results.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
