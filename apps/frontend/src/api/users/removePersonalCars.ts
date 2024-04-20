import userInstance from ".";
import { Response, User } from "@/core/types";

export default async function removePersonalCars(carId: string) {
    try {
        const results = await userInstance.delete<Response<User>>(
            `/car/${carId}`,
        );
        return results.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
