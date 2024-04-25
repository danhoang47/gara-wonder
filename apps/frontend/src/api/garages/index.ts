import { auth } from "@/components/firebase";
import axios, { HttpStatusCode } from "axios";

export const baseGaragesUrl = `${import.meta.env.VITE_API_URL}/garage`;

const garageInstance = axios.create({
    baseURL: baseGaragesUrl,
});

garageInstance.interceptors.request.use(async (request) => {
    const token = await auth.currentUser?.getIdToken();
    request.headers.Authorization = "Bearer " + token;

    return request;
});

garageInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config } = error;

        if (!config || !config.retry) {
            return Promise.reject(error);
        }
        config.retry -= 1;

        if (error.response.status === HttpStatusCode.Unauthorized) {
            const newToken = await auth.currentUser?.getIdToken(true);
            config.headers["Authorization"] = "Bearer " + newToken;
        }
        const delayRetryRequest = new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, config.retryDelay || 1000);
        });
        return delayRetryRequest.then(() => garageInstance(config));
    },
);

export { default as initGarage } from "./initGarage";
export { default as createGarage } from "./createGarage";
export { default as getGarages } from "./getGarages";
export { default as uploadGarageImages } from "./uploadGarageImages";

export { default as getGarageImages } from "./getGarageImages";
export { default as getBasicGarageInfo } from "./getBasicGarageInfo";
export { default as getGarageServices } from "./getGarageServices";

export { default as getGarageByOwnerId } from "./getGarageByOwnerId";
export { default as addGarageToFavorites } from "./addGarageToFavorites";
export { default as getDashboardInfo } from "./getDashboardInfo";

export { default as getOrderEvaluation } from "./getOrderEvaluation";

export { default as getScheduleSlot } from "./getScheduleSlot";
export { default as configScheduleSlot } from "./configScheduleSlot";

export { default as updateService } from "./updateServices";
export { default as delteService } from "./deleteService";
export { default as addNewService } from "./addNewServices";
export { default as getDistance } from "./getDistance";
export { default as updateGarageSetting } from "./updateGarageSetting";
export { default as getGarageSetting } from "./getGarageSetting";

export { default as getPlaceSuggestions } from "./getPlaceSuggestions";
export { default as getReviews } from "./getReviews";

export { default as getInvitationsByGarageId } from "./getInvitationsByGarageId";
export { default as createInvitations } from "./createInvitations";
export { default as getGarageLiscense } from "./getGarageLiscense";
export { default as updateGarageLiscene } from "./updateLiscene";

export { default as getStaffs } from "./getStaffs";
export { default as updateStaffs } from "./updateStaffs";
export { default as removeStaffs } from "./removeStaffs";
export { default as getGarageIncome } from "./getGarageIncome";
export { default as getBillings } from './getBillings'

export default garageInstance;
