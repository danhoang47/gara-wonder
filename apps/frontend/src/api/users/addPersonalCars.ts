import userInstance from ".";
import { Car, Response, User } from "@/core/types";

export default async function addPersonalCars(car: Partial<Car>) {
    try {
        const results = await userInstance.post<Response<User>>(`/car`, [car]);
        return results.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
