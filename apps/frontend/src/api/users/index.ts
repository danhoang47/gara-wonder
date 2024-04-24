import { auth } from "@/components/firebase";
import axios, { HttpStatusCode } from "axios";

export const baseUsersUrl = import.meta.env.VITE_API_URL + "/users";

const userInstance = axios.create({
    baseURL: baseUsersUrl,
});

userInstance.interceptors.request.use(async (request) => {
    const token = await auth.currentUser?.getIdToken();
    request.headers.Authorization = "Bearer " + token;

    return request;
});

userInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config } = error;

        if (error.response.status === HttpStatusCode.Unauthorized) {
            const token = await auth.currentUser?.getIdToken(true);
            config.headers["Authorization"] = "Bearer " + token;
        }

        const delayRetryRequest = new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, config.retryDelay || 1000);
        });
        return delayRetryRequest.then(() => userInstance(config));
    },
);

export default userInstance;
export { default as getUser } from "./getUser";
export { default as signup } from "./signup";
export { default as getUserOrders } from "./getUserOrders";
export { default as getUserOrderById } from "./getUserOrderById";
export { default as confirmEvaluation } from "./confirmEvaluation";
export { default as updateUserProfile } from "./updateUserProfile";
export { default as persistPayment } from "./persistPayment";
export { default as createPayment } from "./payment";
export { default as cancelOrder } from "./cancelOrder";
export { default as getUsers } from "./getUsers";
export { default as getInvitations } from "./getInvitations";
export { default as addReview } from "./addReview";
export { default as addPersonalCars } from "./addPersonalCars";
export { default as removePersonalCars } from "./removePersonalCars";
export { default as updatePersonalCars } from "./updatePersonalCars";
export { default as acceptOrRejectInvitations } from "./acceptOrRejectInvitations";
export { default as createGarageReport } from "./createGarageReport";
